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
        self.id = id
        self.user = user
        self.forumsVM = .init(user: user)
        forumsVM.fetchComments(id)
    }
    
    var body: some View {
        ScrollView{
            ForEach(forumsVM.posts) { post in
                if post.id == id{
                    ForumCellView(post: post, commentCount: forumsVM.comments.count)
                        .padding([.horizontal, .top])
                    
                    Divider()
                }
            }
            ForEach(forumsVM.comments) { comment in
                ForumCellView(post: comment, commentCount: 0)
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
