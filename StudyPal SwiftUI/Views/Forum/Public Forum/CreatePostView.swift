//
//  CreatePostView.swift
//  StudyPal SwiftUI
//
//  Created by Don Bouncy on 19/08/2022.
//

import SwiftUI

struct CreatePostView: View {
    @Environment(\.dismiss) var dismiss
    
    @ObservedObject var forumsVM: ForumsViewModel
    @ObservedObject var topicsVM: TopicsViewModel
    
    @Binding var createComplete: Bool
    @State private var dropDown = false
    
    let user: UserInfo?
    
    init(user: UserInfo?, createComplete: Binding<Bool>) {
        self.user = user
        self._createComplete = createComplete
        self.forumsVM = .init(user: user)
        self.topicsVM = .init()
    }
    
    var body: some View {
        NavigationView {
            VStack {
                TextEditor(text: $forumsVM.postContent)
                    .frame(maxHeight: UIScreen.main.bounds.height - 400)
                    .foregroundColor(Color.black)
                    .overlay {
                        if forumsVM.postContent.isEmpty{
                            VStack{
                                HStack {
                                    Text("Ask a question...")
                                        .padding(.top, 7)
                                        .padding(.leading, 2)
                                        .foregroundColor(.gray)
                                    Spacer()
                                }
                                Spacer()
                            }
                        }
                    }
                VStack(alignment: .leading) {
                    Text("Topic")
                    DisclosureGroup(forumsVM.topic, isExpanded: $dropDown) {
                        HStack {
                            ScrollView {
                                VStack(alignment: .leading){
                                    ForEach(topicsVM.topics) { topic in
                                        Text(topic.name)
                                            .font(.system(size: 15))
                                            .padding(.vertical, 10)
                                            .onTapGesture {
                                                forumsVM.topic = topic.name
                                                withAnimation {
                                                    dropDown.toggle()
                                                }
                                            }
                                    }
                                }
                            }
                            Spacer()
                        }
                    }
                    .accentColor(.white)
                    .foregroundColor(.white)
                    .padding()
                    .background(Color("BasicColor"))
                    .cornerRadius(10)
                }
                .padding()
                Spacer()
            }
            .toolbar{
                ToolbarItem(placement: .navigationBarLeading) {
                    Button {
                        dismiss()
                    } label: {
                        Text("Cancel")
                            .foregroundColor(.primary)
                    }
                }
                ToolbarItem(placement: .navigationBarTrailing) {
                    Button {
                        forumsVM.createPosts()
                        createComplete.toggle()
                    } label: {
                        Text("Send")
                            .foregroundColor(.white)
                            .fontWeight(.bold)
                            .padding(.horizontal, 15)
                            .padding(.vertical, 7)
                            .background(Color("BasicColor"))
                            .cornerRadius(25)
                            .disabled(forumsVM.postContent.isEmpty)
                            .opacity(forumsVM.postContent.isEmpty ? 0.6 : 1)
                    }
                }
            }
        }
    }
}

struct CreatePostView_Previews: PreviewProvider {
    static var previews: some View {
        CreatePostView(user: .none, createComplete: .constant(false))
    }
}
