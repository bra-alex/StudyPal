//
//  GroupsView.swift
//  StudyPal SwiftUI
//
//  Created by Don Bouncy on 26/07/2022.
//

import SwiftUI

struct GroupsView: View {
    @ObservedObject var groupChatVM: GroupChatViewModel
    @ObservedObject var userVM: UserViewModel
    
    @Binding var showMenu: Bool
    @State var newGroup = false
    
    init(userVM: UserViewModel, showMenu: Binding<Bool>) {
        self.userVM = userVM
        groupChatVM = .init(users: userVM.user)
        self._showMenu = showMenu
    }
    
    var body: some View {
        NavigationStack {
            VStack {
                NavBar(user: userVM.user, title: "Groups", showMenu: $showMenu)
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
                        NewGroupView(user: userVM.user, createComplete: $newGroup)
                    }
            }
        }
    }
}

struct GroupsView_Previews: PreviewProvider {
    static var previews: some View {
        GroupsView(userVM: UserViewModel(), showMenu: .constant(false))
    }
}
