//
//  ForumCellView.swift
//  StudyPal SwiftUI
//
//  Created by Don Bouncy on 19/08/2022.
//

import SwiftUI

struct ForumCellView: View {
    @ObservedObject var postVM: CommentsViewModel
    var post: Forums
    
    init(post: Forums) {
        self.post = post
        postVM = .init(id: post.id ?? "")
    }
    
    var body: some View {
        HStack() {
            VStack(alignment: .leading, spacing: 5){
                CellTopView(name: post.name, username: post.username, date: post.formattedTime)
                CellMiddleView(postContent: post.postContent, mediaURL: post.mediaURL)
                    .padding(.bottom)
                Reactions(id: post.id ?? "id", topic: post.topic, commentCount: postVM.comments.count)
                Spacer()
            }
            Spacer()
        }
    }
}

struct ForumCellView_Previews: PreviewProvider {
    static var previews: some View {
        ForumCellView( post: .init(id: "biPI19StJa3JuW8HaTMP", name: "Me", username: "you", postContent: "tui", mediaURL: "", topic: "Hi", time: Date(), votes: 5, comments: nil))
    }
}
