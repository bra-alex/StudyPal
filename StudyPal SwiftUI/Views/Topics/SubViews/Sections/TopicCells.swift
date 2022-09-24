//
//  TopicCells.swift
//  StudyPal SwiftUI
//
//  Created by Don Bouncy on 21/08/2022.
//

import SwiftUI

struct TopicCells: View {
    let topicName: String
    @ObservedObject var topicsVM: TopicsViewModel
    let user: UserInfo?
    
    init(topicName: String, user: UserInfo?) {
        self.user = user
        self.topicName = topicName
        self.topicsVM = .init(user: user)
    }
    var body: some View {
        HStack{
            VStack(alignment: .leading, spacing: 6){
                Text(topicName)
                    .font(.title3.bold())
                
//                Text("Interactions")
//                    .font(.subheadline)
//                    .foregroundColor(.gray)
            }
            
            Spacer()
            
            if let uid = user?.id {
//                var b = false
                if topicsVM.topics.contains { topic in
                    if topic.name == topicName && !topic.uid.contains(uid){
                      return true
                    }
                    return false
                }{
                    Button {
                        topicsVM.updateMembers(topic: topicName)
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
}

struct TopicCells_Previews: PreviewProvider {
    static var previews: some View {
        TopicCells(topicName: "Topic", user: .none)
    }
}
