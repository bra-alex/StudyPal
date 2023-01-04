//
//  CommentsView.swift
//  StudyPal SwiftUI
//
//  Created by Don Bouncy on 01/09/2022.
//

import SwiftUI

struct CommentsView: View {
    @ObservedObject var commentsVM: CommentsViewModel
    @ObservedObject var forumsVM: ForumsViewModel
    
    let post: Forums
    
    init(post: Forums, forumsVM: ForumsViewModel){
        self.forumsVM = forumsVM
        self.post = post
        commentsVM = .init(id: post.id ?? "")
    }
    
    var body: some View {
        ScrollView{
            ForumCellView(post: post)
                .padding([.horizontal, .top])
            
            Divider()
            
            ForEach(commentsVM.comments) { comment in
                CommentsCellView(comment: comment, commentCount: 0)
                    .padding([.horizontal, .top])

                Divider()
            }
        }
        .onTapGesture {
            hideKeyboard()
        }
        
        CommentsViewBottomView(forumsVM: forumsVM, id: post.id ?? "")
    }
}

struct CommentsView_Previews: PreviewProvider {
    static var previews: some View {
        CommentsView(post: ForumsViewModel(user: .none).posts[0], forumsVM: ForumsViewModel(user: .none))
    }
}
