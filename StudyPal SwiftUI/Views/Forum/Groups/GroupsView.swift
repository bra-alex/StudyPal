//
//  GroupsView.swift
//  StudyPal SwiftUI
//
//  Created by Don Bouncy on 26/07/2022.
//

import SwiftUI

struct GroupsView: View {
    @ObservedObject var groupChatVM: GroupChatViewModel
    @Binding var showMenu: Bool
    @State var newGroup = false
    
    let user: UserInfo?
    
    init(user: UserInfo?, showMenu: Binding<Bool>) {
        self.user = user
        self.groupChatVM = .init(users: user)
        self._showMenu = showMenu
    }
    
    var body: some View {
        NavigationStack {
            VStack {
                NavBar(showMenu: $showMenu, title: "Groups")
                    .transaction { transaction in
                        transaction.animation = nil
                    }
                List{
                    ForEach(groupChatVM.groupChats) { chats in
                        VStack {
                            ZStack {
                                GroupChatRow(groupInfo: chats)
                                NavigationLink {
                                    GroupChatView(group: chats)
                                        .navigationTitle(chats.title)
                                } label: {
                                    EmptyView()
                                }
                                .buttonStyle(PlainButtonStyle())
                                .frame(width: 0)
                                .opacity(0)
                            }
                        }
                        
                    }
                }.listStyle(.plain)
                    .overlay(alignment: .bottom) {
                        OverlayBtn(showModal: $newGroup, img: "plus")
                    }
                    .sheet(isPresented: $newGroup) {
                        NewGroupView(user: user, createComplete: $newGroup)
                    }
            }
        }
    }
}

struct GroupsView_Previews: PreviewProvider {
    static var previews: some View {
        GroupsView(user: .init(id: "btllqsJxHxZFYalecGyPQp2zZlI2", name: "Me", email: "you@gmail.com", username: "@hiiiii", profileImageUrl: "longshih"), showMenu: .constant(false))
    }
}
