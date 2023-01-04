//
//  ForumsViewModel.swift
//  StudyPal SwiftUI
//
//  Created by Don Bouncy on 19/08/2022.
//

import Foundation
import FirebaseFirestore
import FirebaseFirestoreSwift

class ForumsViewModel: ObservableObject{
    @Published var posts = [Forums]()
    
    @Published var postContent = ""
    @Published var topic = "General"
    
    let user: UserInfo?

    init(user: UserInfo?){
        self.user = user
        fetchPosts()
    }
    
    func fetchPosts(){
        self.posts.removeAll()
        
        FirebaseManager.shared.firestore
            .collection("posts")
            .order(by: "time", descending: false)
            .addSnapshotListener { snapshot, error in
                if let error = error{
                    print(error.localizedDescription)
                    return
                }
                
                snapshot?.documentChanges.forEach({ change in
                    if change.type == .added{
                        do{
                            let data = try change.document.data(as: Forums.self)
                            self.posts.append(data)
                        } catch {
                            print(error)
                        }
                    }
                })
            }
    }
    
    func createPosts(){
        let doc = FirebaseManager.shared.firestore
            .collection("posts")
            .document()
        
        let postData = Forums(name: user?.name ?? "", username: user?.username ?? "", postContent: postContent, mediaURL: "", topic: topic, time: Date(), votes: 0, comments: nil)
        
        try? doc.setData(from: postData){ error in
            if let error = error{
                print(error.localizedDescription)
                return
            }
        }
    }
    
    func createComment(_ id: String){
        let doc = FirebaseManager.shared.firestore
            .collection("posts")
            .document(id)
            .collection("comments")
            .document()
        
        let commentData = Forums(name: user?.name ?? "", username: user?.username ?? "", postContent: postContent, mediaURL: "", topic: topic, time: Date(), votes: 0, comments: nil)
        
        try? doc.setData(from: commentData){ error in
            if let error = error{
                print(error.localizedDescription)
                return
            }
        }
    }
    
}
