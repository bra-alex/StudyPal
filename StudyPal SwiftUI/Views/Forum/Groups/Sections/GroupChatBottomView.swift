//
//  GroupChatBottomView.swift
//  StudyPal SwiftUI
//
//  Created by Don Bouncy on 18/08/2022.
//

import SwiftUI

struct GroupChatBottomView: View {
    @ObservedObject var groupMessageVM: GroupMessageViewModel
    let group: GroupChatModel
    
    @State var textEditorHeight : CGFloat = 20
    var body: some View {
        HStack(spacing: 13) {
            Image(systemName: "photo.on.rectangle.angled")
                .font(.system(size: 24))
            
            ZStack {
                Text(groupMessageVM.message)
                    .font(.system(.body))
                    .foregroundColor(.clear)
                    .padding(.top, 14)
                    .background(GeometryReader {
                        Color.clear.preference(key: ViewHeight.self,
                                               value: $0.frame(in: .local).size.height)
                    })

                TextEditor(text: $groupMessageVM.message)
                    .font(.system(.body))
                    .frame(height: max(40,textEditorHeight))
                    .padding(.leading, 4.0)
                    .padding(.vertical, 4.0)
                    .overlay {
                        if groupMessageVM.message.isEmpty{
                            HStack {
                                Text("Send a chat")
                                    .padding(.leading, 9)
                                    .opacity(0.5)
                                Spacer()
                            }
                        }
                        RoundedRectangle(cornerRadius: 25).stroke(Color(.lightGray))

                    }
            }.onPreferenceChange(ViewHeight.self) { textEditorHeight = $0 }

            Button {
                groupMessageVM.sendMessage()
                groupMessageVM.message = ""
                groupMessageVM.count += 1
            } label: {
                Image(systemName: "arrow.up.circle.fill")
                    .font(.system(size: 30))
            }
            .opacity(groupMessageVM.message.isEmpty ? 0.5 : 1 )
            .disabled(groupMessageVM.message.isEmpty)
            .animation(.easeInOut(duration: 0.2), value: groupMessageVM.message.isEmpty)
        }
        .padding(8)
    }
}

struct ViewHeight: PreferenceKey {
    static var defaultValue: CGFloat { 0 }
    static func reduce(value: inout Value, nextValue: () -> Value) {
        value = value + nextValue()
    }
}

struct GroupChatBottomView_Previews: PreviewProvider {
    static var previews: some View {
        GroupChatBottomView(groupMessageVM: GroupMessageViewModel(groupID: ""), group: .init(title: "Hihi", joinCode: 22583, isPublic: false, time: Date(), users: ["btllqsJxHxZFYalecGyPQp2zZlI2"]))
    }
}
