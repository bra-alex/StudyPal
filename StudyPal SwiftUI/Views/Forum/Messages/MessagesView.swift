//
//  MessagesView.swift
//  StudyPal SwiftUI
//
//  Created by Don Bouncy on 26/07/2022.
//

import SwiftUI

struct MessagesView: View {
    @ObservedObject var user = UserViewModel()
    @State var newMessage = false
    @State var chatUser: UserInfo?
    @State var showChatView = false
    @State private var query = ""
    @Binding var showMenu: Bool
    
    init(showMenu: Binding<Bool>){
        self._showMenu = showMenu
        user.fetchRecentMessages()
    }
    
    var body: some View {
        NavigationStack {
            VStack {
                NavBar(showMenu: $showMenu, title: "Message")
                    .transaction { transaction in
                        transaction.animation = nil
                    }
                List {
                    ForEach(user.searchChats(query: query)){ recentMessage in
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
                
                
                NavigationLink("", isActive: $showChatView) {
                    ChatView(user: self.chatUser)
                }
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
        MessagesView(showMenu: .constant(false))
    }
}
