//
//  CommentsCellView.swift
//  StudyPal SwiftUI
//
//  Created by Don Bouncy on 04/01/2023.
//

import SwiftUI

struct CommentsCellView: View {
    var comment: Forums.Comments
    var commentCount: Int
    
    var body: some View {
        HStack() {
            VStack(alignment: .leading, spacing: 5){
                CellTopView(name: comment.name, username: comment.username, date: comment.formattedTime)
                CellMiddleView(postContent: comment.postContent, mediaURL: comment.mediaURL)
                    .padding(.bottom)
                Reactions(id: comment.id ?? "id", topic: comment.topic, commentCount: commentCount)
                Spacer()
            }
            Spacer()
        }
    }
}

struct CommentsCellView_Previews: PreviewProvider {
    static var previews: some View {
        CommentsCellView(comment: CommentsViewModel(id: "").comments[0], commentCount: 2)
    }
}
