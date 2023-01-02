//
//  MessagesViewModel.swift
//  StudyPal SwiftUI
//
//  Created by Don Bouncy on 09/08/2022.
//

import Foundation
import SwiftUI
import FirebaseFirestore
import FirebaseFirestoreSwift

class MessagesViewModel: ObservableObject{
    @Published var count = 0
    @Published var message = ""
    @Published var messages = [Message]()
    @Published var isUserCurrentlyLoggedIn = true
    var firestoreListener: ListenerRegistration?
    
    var user: UserInfo?
    
    init(user: UserInfo?) {
        self.user = user
    }
    
    func fetchMessages(){
        
        guard let sender = FirebaseManager.shared.auth.currentUser?.uid else { return }
        
        guard let receipient = user?.id else { return }
        
        messages.removeAll()
        
        FirebaseManager.shared.firestore
            .collection("messages")
            .document(sender)
            .collection(receipient)
            .order(by: "time")
            .addSnapshotListener { querySnapshot, error in
                if let error = error{
                    print(error.localizedDescription)
                    return
                }
                querySnapshot?.documentChanges.forEach({ change in
                    if change.type == .added{
                        do{
                            let data = try change.document.data(as: Message.self)
                            self.messages.append(data)
                            self.firestoreListener?.remove()
                        } catch {
                            print(error)
                        }
                        
                    }
                    
                })
                DispatchQueue.main.async {
                    self.count += 1
                }
            }
        
    }
    
    func handleSend(){
        guard let sender = FirebaseManager.shared.auth.currentUser?.uid else { return }
        
        guard let receipient = user?.id else { return }
        
        let senderDocument = FirebaseManager.shared.firestore
            .collection("messages")
            .document(sender)
            .collection(receipient)
            .document()
        
        let messageData = Message(sender: sender,
                                  receipient: receipient,
                                  message: message,
                                  time: Date())
        
        persistRecentMessage()
        
        try? senderDocument.setData(from: messageData) { error in
            if let error = error{
                print(error.localizedDescription)
                return
            }
        }
        
        let receipientDocument = FirebaseManager.shared.firestore
            .collection("messages")
            .document(receipient)
            .collection(sender)
            .document()
        
        try? receipientDocument.setData(from: messageData) { error in
            if let error = error{
                print(error.localizedDescription)
            }
        }
    }
    
    private func persistRecentMessage(){
        guard let uid = FirebaseManager.shared.auth.currentUser?.uid else { return }
        guard let receipient = self.user?.id else { return }
        
        let document = FirebaseManager.shared.firestore
            .collection("recent_messages")
            .document(uid)
            .collection("messages")
            .document(receipient)
        
        let senderData = RecentMessages(sender: uid,
                                        receipient: receipient,
                                        name: user?.name ?? "",
                                        timestamp: Date(),
                                        message: message,
                                        profileImageUrl: user?.profileImageUrl ?? "",
                                        type: "Sent")
        
        try? document.setData(from: senderData){ error in
            if let error = error{
                print(error.localizedDescription)
                return
            }
        }
        
        guard let uid = FirebaseManager.shared.auth.currentUser?.uid else{ return }
        let msg = message
        
        FirebaseManager.shared.firestore
            .collection("users")
            .document(uid)
            .getDocument { snapshot, error in
                if let error = error{
                    print(error.localizedDescription)
                }
                
                guard let currentUser = try? snapshot?.data(as: UserInfo.self) else {return}
                
                let receipientData = RecentMessages(sender: uid,
                                                    receipient: receipient,
                                                    name: currentUser.name,
                                                    timestamp: Date(),
                                                    message: msg,
                                                    profileImageUrl: currentUser.profileImageUrl,
                                                    type: "Received")
                
                try? FirebaseManager.shared.firestore
                    .collection("recent_messages")
                    .document(receipient)
                    .collection("messages")
                    .document(currentUser.id!)
                    .setData(from: receipientData) { error in
                        if let error = error {
                            print(error.localizedDescription)
                            return
                        }
                    }
            }
    }
}
