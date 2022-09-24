//
//  VoteUpdater.swift
//  StudyPal SwiftUI
//
//  Created by Don Bouncy on 20/08/2022.
//

import Foundation
import FirebaseFirestore

class VoteUpdater: ObservableObject{
    @Published var vote = 0
    @Published var upVote = false
    @Published var downVote = false
    
    func increaseVote(_ topic: String, docID: String){
        FirebaseManager.shared.firestore
            .collection("posts")
            .document(docID)
            .updateData([
                "votes": FieldValue.increment(Int64(1))
            ])
        createVote(topic, docID: docID)
    }
    
    func decreaseVote(_ topic: String, docID: String){
        FirebaseManager.shared.firestore
            .collection("posts")
            .document(docID)
            .updateData([
                "votes": FieldValue.increment(Int64(-1))
            ])
        createVote(topic, docID: docID)
    }
    
    private func createVote(_ topic: String, docID: String){
        guard let uid = FirebaseManager.shared.auth.currentUser?.uid else { return }
        FirebaseManager.shared.firestore
            .collection("posts")
            .document(docID)
            .collection(uid)
            .document("vote_catcher")
            .setData([
                "downVote": downVote,
                "upVote": upVote
            ], merge: true)
    }
    
    func fetchVote(_ topic: String, docID: String){
        FirebaseManager.shared.firestore
            .collection("posts")
            .document(docID)
            .addSnapshotListener { snapshot, error in
                if let error = error{
                    print(error.localizedDescription)
                    return
                }
                
                if let data = try? snapshot?.data(as: Forums.self){
                    self.vote = data.votes
                }
            }
        
        guard let uid = FirebaseManager.shared.auth.currentUser?.uid else { return }
        
        FirebaseManager.shared.firestore
            .collection("posts")
            .document(docID)
            .collection(uid)
            .addSnapshotListener { snapshot, error in
                if let error = error{
                    print(error.localizedDescription)
                    return
                }
                
                snapshot?.documentChanges.forEach({ change in
                    let data = change.document.data() as [String: Any]
                    self.downVote = data["downVote"] as! Bool
                    self.upVote = data["upVote"] as! Bool
                })
            }
    }
}
