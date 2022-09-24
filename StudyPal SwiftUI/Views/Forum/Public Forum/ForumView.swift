//
//  ForumView.swift
//  StudyPal SwiftUI
//
//  Created by Don Bouncy on 26/07/2022.
//

import SwiftUI

struct ForumView: View {
    @ObservedObject var forumsVM: ForumsViewModel
    @Binding var showMenu: Bool
    @State var createPost = false
    
    let user: UserInfo?
    
    init(user: UserInfo?, showMenu: Binding<Bool>){
        self.user = user
        self._showMenu = showMenu
        self.forumsVM = .init(user: user)
    }
    
    var body: some View {
        NavigationStack {
            VStack {
                NavBar(showMenu: $showMenu, title: "Forum")
                    .transaction { transaction in
                        transaction.animation = nil
                    }
                ScrollView {
                    ForEach(forumsVM.posts) { posts in
                        NavigationLink {
                            CommentsView(user: user, id: posts.id ?? "")
                                .navigationBarTitle("Question")
                                .navigationBarTitleDisplayMode(.inline)
                        } label: {
                            ForumCellView(id: posts.id ?? "", name: posts.name, username: posts.username, postContent: posts.postContent, mediaURL: posts.mediaURL, date: posts.formattedTime, topic: posts.topic, commentCount: forumsVM.comments.count)
                                .frame(minHeight: 100, maxHeight: .infinity)
                                .padding(posts.mediaURL.isEmpty ? [.top] : [.top], 0)
                                .foregroundColor(.primary)
                        }
                        Divider()
                    }.padding([.horizontal, .top])
                    
                    
                }//.listStyle(PlainListStyle())
            }.overlay(alignment: .bottom) {
                OverlayBtn(showModal: $createPost, img: "plus")
            }
        }
        .sheet(isPresented: $createPost) {
            CreatePostView(user: user, createComplete: $createPost)
        }
        
    }
}

struct ForumView_Previews: PreviewProvider {
    static var previews: some View {
        ForumView(user: .none, showMenu: .constant(false))
    }
}
