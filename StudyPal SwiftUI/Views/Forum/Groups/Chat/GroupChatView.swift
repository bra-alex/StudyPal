//
//  GroupChatView.swift
//  StudyPal SwiftUI
//
//  Created by Don Bouncy on 17/08/2022.
//

import SwiftUI

struct GroupChatView: View {
    @ObservedObject var groupMessageVM: GroupMessageViewModel
    @State var isVideo = false
    
    let group: GroupChatModel
    
    init(group: GroupChatModel) {
        self.group = group
        self.groupMessageVM = .init(groupID: group.id ?? "doc")
        groupMessageVM.fetchMessages()
    }
    
    var body: some View {
        VStack{
            ScrollView{
                ScrollViewReader{ scrollViewProxy in
                    VStack {
                        ForEach(groupMessageVM.messages){ messages in
                            GroupMessageBubble(message: messages, name: messages.name, messages: messages.message)
                        }
                        HStack{ Spacer() }
                            .id("Empty")
                            .onReceive(groupMessageVM.$count) { _ in
                                withAnimation(.easeOut(duration: 0.5)) {
                                    scrollViewProxy.scrollTo("Empty", anchor: .bottom)
                                }
                            }
                        
                    }
                }
            }
            .scrollDismissesKeyboard(.interactively)
                .onTapGesture {
                    hideKeyboard()
                }
                .background(Color(.init(white: 0.95, alpha: 1)))
                .safeAreaInset(edge: .bottom) {
                    GroupChatBottomView(groupMessageVM: groupMessageVM, group: group)
                        .background(
                            Color(
                                .systemBackground)
                            .ignoresSafeArea()
                        )
                }
                .fullScreenCover(isPresented: $isVideo) {
                    CallView()
                }
        }
        .toolbar{
            ToolbarItem(placement: .navigationBarTrailing, content: {
                Button {
                    isVideo.toggle()
                } label: {
                    Image(systemName: "phone")
                        .padding(.trailing)
                }

            })
        }
    }
}

struct GroupChatView_Previews: PreviewProvider {
    static var previews: some View {
        GroupChatView(group: .init(title: "Hihi", joinCode: 22583, isPublic: false, time: Date(), users: ["btllqsJxHxZFYalecGyPQp2zZlI2"]))
    }
}
