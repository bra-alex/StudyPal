//
//  MessagesView.swift
//  StudyPal SwiftUI
//
//  Created by Don Bouncy on 26/07/2022.
//

import SwiftUI

struct MessagesView: View {
    @ObservedObject var userVM: UserViewModel
    @Binding var showMenu: Bool
    
    @State private var query = ""
    @State private var chatUser: UserInfo?
    
    @State private var newMessage = false
    @State private var showChatView = false
    
    var body: some View {
        NavigationStack {
            VStack {
                NavBar(user: userVM.user, title: "Message", showMenu: $showMenu)
                    .transaction { transaction in
                        transaction.animation = nil
                    }
                List {
                    ForEach(userVM.searchChats(query: query)){ recentMessage in
                        VStack {
                            ZStack{
                                ChatRow(recentMessages: recentMessage)
                                NavigationLink {
                                    let uid = FirebaseManager.shared.auth.currentUser?.uid == recentMessage.sender ? recentMessage.receipient : recentMessage.sender
                                    
                                    ChatView(user: .init(id: uid, name: recentMessage.name, email: "", username: "", profileImageUrl: recentMessage.profileImageUrl))
                                } label: {
                                    EmptyView()
                                }
                                .buttonStyle(PlainButtonStyle())
                                .frame(width: 0)
                                .opacity(0)
                            }
                        }
                    }
                }
                .listStyle(.plain)
                .navigationDestination(isPresented: $showChatView) {
                    ChatView(user: self.chatUser)
                }
                
                
//                NavigationLink("", isActive: $showChatView) {
//                    ChatView(user: self.chatUser)
//                }
            }
            .overlay(alignment: .bottom) {
                OverlayBtn(showModal: $newMessage, img: "plus.message")
            }
            .sheet(isPresented: $newMessage) {
                NewMessageView(selectedUser: { user in
                    self.showChatView.toggle()
                    chatUser = user
                })
            }
        }
    }
}

struct MessagesView_Previews: PreviewProvider {
    static var previews: some View {
        MessagesView(userVM: UserViewModel(), showMenu: .constant(false))
    }
}
