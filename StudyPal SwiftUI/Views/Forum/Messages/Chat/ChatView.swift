//
//  ChatView.swift
//  StudyPal SwiftUI
//
//  Created by Don Bouncy on 29/07/2022.
//

import SwiftUI

struct ChatView: View {
    @ObservedObject var messagesVM: MessagesViewModel
    
    @State var isVideo = false
    
    let user: UserInfo?
    
    init(user: UserInfo?) {
        self.user = user
        self.messagesVM = .init(user: user)
        messagesVM.fetchMessages()
    }
    
    var body: some View {
        VStack {
            ScrollView {
                ScrollViewReader{ scrollViewProxy in
                    VStack{
                        ForEach(messagesVM.messages){ messages in
                            MessageBubble(messages: messages)
                        }
                        HStack{ Spacer() }
                            .id("Empty")
                            .onReceive(messagesVM.$count) { _ in
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
                ChatBarBottom(messagesVM: messagesVM)
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
        .navigationTitle(user?.name ?? " ")
        .navigationBarTitleDisplayMode(.inline)
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

struct ChatView_Previews: PreviewProvider {
    static var previews: some View {
        NavigationView {
            ChatView(user: .none)
        }
    }
}

