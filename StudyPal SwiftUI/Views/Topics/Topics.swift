//
//  Topics.swift
//  StudyPal SwiftUI
//
//  Created by Don Bouncy on 20/08/2022.
//

import SwiftUI

struct Topics: View {
    @ObservedObject var topicsVM: TopicsViewModel
    
    let user: UserInfo?
    
    init(user: UserInfo?){
        self.user = user
        self.topicsVM = .init(user: user)
    }
    
    var body: some View {
        ZStack {
            VStack {
                if topicsVM.topics.isEmpty{
                    Button {
                        topicsVM.addTopic.toggle()
                    } label: {
                        Text("+ Add a new topic")
                            .font(.title.bold())
                            .foregroundColor(Color("BasicColor"))
                    }
                    
                }else{
                    ScrollView {
                        ForEach(topicsVM.topics) { topics in
                            TopicCells(topicName: topics.name, user: user)
                                .padding(.horizontal)
                            Divider()
                        }
                    }
                }
            }
            .toolbar {
                ToolbarItem(placement: .navigationBarTrailing) {
                    Button {
                        topicsVM.addTopic.toggle()
                    } label: {
                        Image(systemName: topicsVM.topics.isEmpty ? "" : "plus" )
                            .padding(5)
                    }
                }
            }
            if topicsVM.addTopic{
                AddTopicView(addTopic: $topicsVM.addTopic, text: $topicsVM.topic, topicsVM: topicsVM)
                    .transition(AnyTransition.opacity.animation(.easeInOut))
            }
        }
    }
}

struct Topics_Previews: PreviewProvider {
    static var previews: some View {
        NavigationView {
            Topics(user: .none)
        }
    }
}
