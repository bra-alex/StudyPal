//
//  NewMessageViewModel.swift
//  StudyPal SwiftUI
//
//  Created by Don Bouncy on 29/07/2022.
//

import Foundation
import SwiftUI

class NewMessageViewModel: ObservableObject{
    
    @Published var users = [UserInfo]()
    
    init() {
        fetchAllUsers()
    }
    
    private func fetchAllUsers() {
        FirebaseManager.shared.firestore.collection("users").getDocuments { documentsSnapshot, error in
            if let error = error{
                print(error.localizedDescription)
                return
            }
             
            documentsSnapshot?.documents.forEach({ snapshot in
                do{
                    let data = try snapshot.data(as: UserInfo.self)
                    let user = data
                    if user.id != FirebaseManager.shared.auth.currentUser?.uid{
                        self.users.append(data)
                        
                    }
                } catch {
                    print(error)
                }
                
                
            })
        }
    }
    
    func searchUsers(query: String) -> [UserInfo]{
        let user = users
        
        if query == ""{
            return user
        }
        
        return user.filter{$0.username.lowercased().contains(query.lowercased())}
    }
}
