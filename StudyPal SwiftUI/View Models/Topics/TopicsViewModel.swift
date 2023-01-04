//
//  TopicsViewModel.swift
//  StudyPal SwiftUI
//
//  Created by Don Bouncy on 21/08/2022.
//

import Foundation
import FirebaseFirestore
import FirebaseFirestoreSwift

class TopicsViewModel: ObservableObject{
    @Published var topics = [TopicsModel]()
    @Published var topic = ""
    @Published var clicked = false
    @Published var addTopic = false
    
    init() {
        fetchTopics()
    }
    
    private func fetchTopics(){
        topics.removeAll()
        FirebaseManager.shared.firestore
            .collection("topics")
            .addSnapshotListener { snapshot, error in
                if let error = error{
                    print(error.localizedDescription)
                    return
                }
                
                snapshot?.documentChanges.forEach({ change in
                    if change.type == .added{
                        if let data = try? change.document.data(as: TopicsModel.self){
                            self.topics.append(data)
                        }
                    }
                })
            }
    }
    
    func createTopic(){
        guard let uid = FirebaseManager.shared.auth.currentUser?.uid else { return }
        let doc = FirebaseManager.shared.firestore
            .collection("topics")
            .document(topic)
            
        let topicData = TopicsModel(name: topic, uid: [uid])
        
        try? doc.setData(from: topicData){ error in
            if let error = error{
                print(error.localizedDescription)
                return
            }
            self.addTopic.toggle()
            self.topic = ""
        }
    }
    
    func updateMembers(topic: String){
        guard let uid = FirebaseManager.shared.auth.currentUser?.uid else { return }
        FirebaseManager.shared.firestore
            .collection("topics")
            .document(topic)
            .updateData([
                "uid" : FieldValue.arrayUnion([uid])
            ])
        clicked.toggle()
    }
}
