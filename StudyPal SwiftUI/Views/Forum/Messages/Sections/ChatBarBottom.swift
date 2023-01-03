//
//  ChatBarBottom.swift
//  StudyPal SwiftUI
//
//  Created by Don Bouncy on 31/07/2022.
//

import SwiftUI

struct ChatBarBottom: View{
    @ObservedObject var messagesVM: MessagesViewModel
    
    @State var textEditorHeight : CGFloat = 20
    
    var body: some View {
            HStack(spacing: 13) {
                Image(systemName: "photo.on.rectangle.angled")
                    .font(.system(size: 24))
                
                ZStack {
                    Text(messagesVM.message)
                        .font(.system(.body))
                        .foregroundColor(.clear)
                        .padding(.top, 14)
                        .background(GeometryReader {
                            Color.clear.preference(key: ViewHeightKey.self,
                                                   value: $0.frame(in: .local).size.height)
                        })
                    
                    TextEditor(text: $messagesVM.message)
                        .font(.system(.body))
                        .frame(height: max(40,textEditorHeight))
                        .padding(.leading, 4.0)
                        .padding(.vertical, 4.0)
                        .overlay {
                            if messagesVM.message.isEmpty{
                                HStack {
                                    Text("Send a chat")
                                        .padding(.leading, 9)
                                        .opacity(0.5)
                                    Spacer()
                                }
                            }
                            RoundedRectangle(cornerRadius: 25).stroke(Color(.lightGray))
                            
                        }
                }.onPreferenceChange(ViewHeightKey.self) { textEditorHeight = $0 }
                
                Button {
                    messagesVM.handleSend()
                    messagesVM.message = ""
                    messagesVM.count += 1
                } label: {
                    Image(systemName: "arrow.up.circle.fill")
                        .font(.system(size: 30))
                }
                .opacity(messagesVM.message.isEmpty ? 0.5 : 1 )
                .disabled(messagesVM.message.isEmpty)
                .animation(.easeInOut(duration: 0.2), value: messagesVM.message.isEmpty)
            }
            .padding(8)
        }
}

struct ChatBarBottomView_Previews: PreviewProvider {
    static var previews: some View {
        ChatBarBottom(messagesVM: MessagesViewModel(user: .none))
    }
}

struct ViewHeightKey: PreferenceKey {
    static var defaultValue: CGFloat { 0 }
    static func reduce(value: inout Value, nextValue: () -> Value) {
        value = value + nextValue()
    }
}
