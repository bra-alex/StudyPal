//
//  CommentsView.swift
//  StudyPal SwiftUI
//
//  Created by Don Bouncy on 01/09/2022.
//

import SwiftUI

struct CommentsView: View {
    @ObservedObject var forumsVM: ForumsViewModel
    @State var textEditorHeight : CGFloat = 20
    let user: UserInfo?
    let id: String
    
    init(user: UserInfo?, id: String){
        self.user = user
        self.forumsVM = .init(user: user)
        self.id = id
        forumsVM.fetchComments(id)
    }
    var body: some View {
        ScrollView{
            ForEach(forumsVM.posts) { posts in
                if posts.id == id{
                    ForumCellView(id: posts.id ?? "", name: posts.name, username: posts.username, postContent: posts.postContent, mediaURL: posts.mediaURL, date: posts.formattedTime, topic: posts.topic, commentCount: forumsVM.comments.count)
                        .padding([.horizontal, .top])
                    
                    Divider()
                }
            }
            ForEach(forumsVM.comments) { comments in
                ForumCellView(id: comments.id ?? "", name: comments.name, username: comments.username, postContent: comments.postContent, mediaURL: comments.mediaURL, date: comments.formattedTime, topic: comments.topic, commentCount: 0)
                    .padding([.horizontal, .top])
                
                Divider()
            }
        }
        .onTapGesture {
            hideKeyboard()
        }
        CommentsViewBottomView
    }
}

struct CommentsView_Previews: PreviewProvider {
    static var previews: some View {
        CommentsView(user: .none, id: "")
    }
}
