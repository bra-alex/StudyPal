//
//  MessagesViewModel.swift
//  StudyPal SwiftUI
//
//  Created by Don Bouncy on 28/07/2022.
//

import Foundation
import FirebaseFirestore
import FirebaseFirestoreSwift

class UserViewModel: ObservableObject{
    
    @Published var users = [UserInfo]()
    @Published var recentMessages = [RecentMessages]()
    private var firestoreListener: ListenerRegistration?
    var user: UserInfo?
    
    init(){
        fetchCurrentUser()
        fetchRecentMessages()
    }
    
    func searchChats(query: String) -> [RecentMessages]{
        let sortedChats = recentMessages.sorted {
            let date1 = $0.timestamp
            let date2 = $1.timestamp
            return date1 > date2
        }
        
        if query == ""{
            return sortedChats
        }
        
        return sortedChats.filter{$0.name.lowercased().contains(query.lowercased())}
    }
    
    func fetchRecentMessages(){
        guard let uid = FirebaseManager.shared.auth.currentUser?.uid else { return }
        
        firestoreListener?.remove()
        self.recentMessages.removeAll()
        
        FirebaseManager.shared.firestore
            .collection("recent_messages")
            .document(uid)
            .collection("messages")
            .order(by: "timestamp")
            .addSnapshotListener { querySnapshot, error in
                if let error = error{
                    print(error.localizedDescription)
                }
                querySnapshot?.documentChanges.forEach({ change in
                    
                    let docID = change.document.documentID
                    
                    if let index = self.recentMessages.firstIndex(where: { rm in
                        return rm.id == docID
                    }) {
                        self.recentMessages.remove(at: index)
                    }
                    
                    do{
                        let rm = try change.document.data(as: RecentMessages.self)
                        self.recentMessages.insert(rm, at: 0)
                    } catch {
                        print(error)
                    }
                })
            }
    }
    
    func fetchCurrentUser(){
        guard let uid = FirebaseManager.shared.auth.currentUser?.uid else{ return }
        
        firestoreListener?.remove()
        
        FirebaseManager.shared.firestore.collection("users").document(uid).getDocument { snapshot, error in
            if let error = error{
                print(error.localizedDescription)
                return
            }
            
            do{
                let data = try snapshot?.data(as: UserInfo.self)
                self.users.removeAll()
                self.users.append(data!)
                self.user = self.users[0]
            } catch {
                print(error)
            }
        }
    }
}
