//
//  ForumView.swift
//  StudyPal SwiftUI
//
//  Created by Don Bouncy on 26/07/2022.
//

import SwiftUI

struct ForumView: View {
    @ObservedObject var forumsVM: ForumsViewModel
    @ObservedObject var userVM: UserViewModel
    
    @Binding var showMenu: Bool
    @State var createPost = false
    
    init(userVM: UserViewModel, showMenu: Binding<Bool>){
        self.userVM = userVM
        self._showMenu = showMenu
        forumsVM = .init(user: userVM.user)
    }
    
    var body: some View {
        NavigationStack {
            VStack {
                NavBar(user: userVM.user, title: "Forum", showMenu: $showMenu)
                    .transaction { transaction in
                        transaction.animation = nil
                    }
                
                ScrollView {
                    ForEach(forumsVM.posts) { post in
                        NavigationLink {
                            CommentsView(post: post, forumsVM: forumsVM)
                                .navigationBarTitle("Question")
                                .navigationBarTitleDisplayMode(.inline)
                        } label: {
                            ForumCellView(post: post)
                                .frame(minHeight: 100, maxHeight: .infinity)
                                .padding(post.mediaURL.isEmpty ? [.top] : [.top], 0)
                                .foregroundColor(.primary)
                        }
                        Divider()
                    }
                    .padding([.horizontal, .top])
                }
            }
            .overlay(alignment: .bottom) {
                OverlayBtn(showModal: $createPost, img: "plus")
            }
        }
        .sheet(isPresented: $createPost) {
            CreatePostView(user: userVM.user, createComplete: $createPost)
        }
    }
}

struct ForumView_Previews: PreviewProvider {
    static var previews: some View {
        ForumView(userVM: UserViewModel(), showMenu: .constant(false))
    }
}
