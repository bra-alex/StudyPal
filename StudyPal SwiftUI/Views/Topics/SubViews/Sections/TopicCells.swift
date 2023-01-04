//
//  TopicCells.swift
//  StudyPal SwiftUI
//
//  Created by Don Bouncy on 21/08/2022.
//

import SwiftUI

struct TopicCells: View {
    @ObservedObject var topicsVM: TopicsViewModel
    
    let topic: TopicsModel
    
    var userID: String {
        FirebaseManager.shared.auth.currentUser?.uid ?? "id"
    }
    
    var body: some View {
        HStack{
            VStack(alignment: .leading, spacing: 6){
                Text(topic.name)
                    .font(.title3.bold())
                
                //                Text("Interactions")
                //                    .font(.subheadline)
                //                    .foregroundColor(.gray)
            }
            
            Spacer()
            
            if topicsVM.topics.contains { topic in
                if topic.name == topic.name && !topic.uid.contains(userID) {
                    return true
                }
                return false
            }{
                Button {
                    topicsVM.updateMembers(topic: topic.name)
                } label: {
                    HStack(spacing: 3) {
                        Image(systemName: "plus")
                            .font(.system(size: 11))
                        Text("Join")
                    }
                    .foregroundColor(.white)
                    .padding(.horizontal, 13)
                    .padding(.vertical, 10)
                    .background(Color("BasicColor"))
                    .cornerRadius(20)
                    .opacity(topicsVM.clicked ? 0 : 1)
                    .animation(.easeInOut, value: topicsVM.clicked)
                }
            }
        }
    }
}

struct TopicCells_Previews: PreviewProvider {
    static var previews: some View {
        TopicCells(topicsVM: TopicsViewModel(), topic: TopicsViewModel().topics[0])
    }
}
