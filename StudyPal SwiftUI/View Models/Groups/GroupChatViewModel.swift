//
//  GroupChatViewModel.swift
//  StudyPal SwiftUI
//
//  Created by Don Bouncy on 17/08/2022.
//

import Foundation
import FirebaseFirestore
import FirebaseFirestoreSwift

class GroupChatViewModel: ObservableObject{
    
    @Published var groupChats = [GroupChatModel]()
    @Published var isPublic = false
    @Published var title = ""
    @Published var joinCode = ""
    
    var users: UserInfo?
    
    init(users: UserInfo?) {
        self.users = users
        fetchGroupChats()
    }
    
    func fetchGroupChats(){
        groupChats.removeAll()
        FirebaseManager.shared.firestore
            .collection("groupChats")
            .whereField("isPublic", isEqualTo: true)
            .order(by: "time")
            .addSnapshotListener { querySnapshot, error in
                if let error = error{
                    print(error.localizedDescription)
                    return
                }
                
                querySnapshot?.documentChanges.forEach({ change in
                    
                    let docID = change.document.documentID
                    
                    if let index = self.groupChats.firstIndex(where: { gm in
                        return gm.id == docID
                    }){
                        self.groupChats.remove(at: index)
                    }
                    
                    do{
                        let data = try change.document.data(as: GroupChatModel.self)
                        self.groupChats.append(data)
                    } catch {
                        print(error)
                    }
                })
            }
        
        guard let users = users else { return }
        
        FirebaseManager.shared.firestore
            .collection("groupChats")
            .whereField("isPublic", isEqualTo: false)
            .addSnapshotListener { querySnapshot, error in
                if let error = error{
                    print(error.localizedDescription)
                    return
                }
                
                querySnapshot?.documentChanges.forEach({ change in
                    let docID = change.document.documentID
                    
                    if let index = self.groupChats.firstIndex(where: { gm in
                        return gm.id == docID
                    }){
                        self.groupChats.remove(at: index)
                    }
                    
                    do{
                        let data = try change.document.data(as: GroupChatModel.self)
                        if data.users.contains(users.id ?? ""){
                            self.groupChats.append(data)
                        }
                    } catch {
                        print(error)
                    }
                    
                })
            }
    }
    
    func createGroup(title: String, handler: @escaping () -> Void){
        let doc = FirebaseManager.shared.firestore.collection("groupChats").document()
        
        let joinCode = Int(joinCode) ?? 0
        
        let groupData = GroupChatModel(title: title, joinCode: joinCode, isPublic: isPublic, time: Date(), users: [users?.id ?? ""])
        
        try? doc.setData(from: groupData){ error in
            if let error = error{
                print(error.localizedDescription)
            } else {
                handler()
            }
        }
    }
    
    func joinGroup(code: String, handler: @escaping () -> Void){
        
        FirebaseManager.shared.firestore
            .collection("groupChats")
            .whereField("joinCode", isEqualTo: Int(code) ?? 0)
            .getDocuments { snapshot, error in
                if let error = error{
                    print(error.localizedDescription)
                } else {
                    for document in snapshot!.documents{
                        FirebaseManager.shared.firestore
                            .collection("groupChats")
                            .document(document.documentID)
                            .updateData([
                                "users": FieldValue
                                    .arrayUnion([
                                        self.users?.id ?? ""
                                    ])
                            ])
                    }
                    handler()
                }
            }
    }
}
