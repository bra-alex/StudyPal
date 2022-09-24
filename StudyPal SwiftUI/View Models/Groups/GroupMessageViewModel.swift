//
//  GroupMessageViewModel.swift
//  StudyPal SwiftUI
//
//  Created by Don Bouncy on 18/08/2022.
//

import Foundation
import FirebaseFirestore
import FirebaseFirestoreSwift

class GroupMessageViewModel: ObservableObject{
    
    @Published var messages = [GroupMessage]()
    @Published var users: UserInfo?
    @Published var message = ""
    @Published var count = 0
    
    init(){
        fetchUser()
    }
    
    func sendMessage(docID: String){
        guard let sender = FirebaseManager.shared.auth.currentUser?.uid else { return }
        let doc = FirebaseManager.shared.firestore
            .collection("groupChats")
            .document(docID)
            .collection("messages")
            .document()
        
        let messageData = GroupMessage(sender: sender, name: users?.name ?? "", message: message, time: Date())
        try? doc.setData(from: messageData) { error in
            if let error = error {
                print(error.localizedDescription)
            }
        }
    }
    
    func fetchMessages(docID: String){
        messages.removeAll()
        FirebaseManager.shared.firestore
            .collection("groupChats")
            .document(docID)
            .collection("messages")
            .order(by: "time", descending: false)
            .addSnapshotListener { snapshot, error in
                snapshot?.documentChanges.forEach({ change in
                    if change.type == .added{
                        do{
                            let data = try change.document.data(as: GroupMessage.self)
                            self.messages.append(data)
                        } catch {
                            print(error)
                        }
                        
                    }
                })
            }
    }
    
    private func fetchUser(){
        guard let uid = FirebaseManager.shared.auth.currentUser?.uid else { return }
        FirebaseManager.shared.firestore
            .collection("users")
            .document(uid)
            .getDocument { snapshot, error in
                if let error = error{
                    print(error.localizedDescription)
                    return
                }
                
                let data = try? snapshot?.data(as: UserInfo.self)
                self.users = data
            }
    }
}
