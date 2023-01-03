//
//  Reactions.swift
//  StudyPal SwiftUI
//
//  Created by Don Bouncy on 19/08/2022.
//

import SwiftUI

struct Reactions: View {
    @ObservedObject var updater = VoteUpdater()
    var id: String
    var topic: String
    var commentCount: Int
    //    @State var upvote = false
    //    @State var downVote = false
    
    init(id: String, topic: String, commentCount: Int) {
        self.id = id
        self.topic = topic
        self.commentCount = commentCount
        updater.fetchVote(topic, docID: id)
    }
    
    var body: some View {
        HStack {
            if commentCount > 0 {
                HStack(alignment: .center, spacing: 5) {
                    Image(systemName: "text.bubble")
                        .font(.system(size: 15))
                        .foregroundColor(updater.upVote ? .gray : .black)
                    
                    Text("\(commentCount)")
                        .font(.system(size: 15))
                }
            }
            
            Spacer()
            HStack(alignment: .center, spacing: 10){
                Button {
                    updater.upVote = true
                    updater.downVote = false
                    updater.increaseVote(topic, docID: id)
                } label: {
                    Image(systemName: "chevron.up")
                        .font(.system(size: 15))
                        .fontWeight(.black)
                        .foregroundColor(updater.upVote ? .gray : .black)
                }
                .padding(.leading, 5)
                .disabled(updater.upVote)
                
                Text("\(updater.vote)")
                    .font(.system(size: 17))
                
                Divider()
                    .background(.white)
                    .padding(.horizontal, 5)
                
                Button {
                    updater.downVote = true
                    updater.upVote = false
                    updater.decreaseVote(topic, docID: id)
                } label: {
                    Image(systemName: "chevron.down")
                        .font(.system(size: 15))
                        .fontWeight(.black)
                        .foregroundColor(updater.downVote ? .gray : .black)
                }
                .padding(.trailing, 5)
                .disabled(updater.downVote)
                
            }.padding(.horizontal, 10)
                .background(.gray.opacity(0.1))
                .cornerRadius(100)
            .frame(height: 40)
        }
    }
}

struct Reactions_Previews: PreviewProvider {
    static var previews: some View {
        Reactions(id: "biPI19StJa3JuW8HaTMP", topic: "General", commentCount: 5)
        
    }
}
