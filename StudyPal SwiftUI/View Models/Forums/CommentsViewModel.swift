//
//  PostViewModel.swift
//  StudyPal SwiftUI
//
//  Created by Don Bouncy on 04/01/2023.
//

import Foundation

class CommentsViewModel: ObservableObject{
    @Published var comments = [Forums.Comments]()
    
    let id: String
    
    init(id: String){
        self.id = id
        fetchComments()
    }
    
    func fetchComments(){
        self.comments.removeAll()
        
        FirebaseManager.shared.firestore
            .collection("posts")
            .document(id)
            .collection("comments")
            .addSnapshotListener { snapshot, error in
                if let error = error{
                    print(error.localizedDescription)
                    return
                }
                
                snapshot?.documentChanges.forEach({ change in
                    if change.type == .added{
                        do{
                            let data = try change.document.data(as: Forums.Comments.self)
                            self.comments.append(data)
                        } catch {
                            print(error)
                        }
                    }
                })
            }
    }
}
