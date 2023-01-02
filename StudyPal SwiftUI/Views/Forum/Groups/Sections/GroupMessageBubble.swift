//
//  GroupMessageBubble.swift
//  StudyPal SwiftUI
//
//  Created by Don Bouncy on 02/01/2023.
//

import SwiftUI

struct GroupMessageBubble: View {
    let message: GroupMessage
    let name: String
    let messages: String
    var body: some View {
        VStack{
            if message.sender == FirebaseManager.shared.auth.currentUser?.uid{
                ChatBubble(direction: .right) {
                    Text(messages)
                        .padding(.horizontal, 15)
                        .padding(.vertical, 10)
                        .foregroundColor(.white)
                        .background(Color.blue)
                    
                }
            }else{
                VStack(alignment: .leading, spacing: 0) {
                    Text(name)
                        .font(.system(size: 13))
                        .foregroundColor(Color(.lightGray))
                        .padding([.leading, .top])
                    ChatBubble(direction: .left) {
                        Text(messages)
                            .padding(.horizontal, 15)
                            .padding(.vertical, 10)
                            .foregroundColor(.black)
                            .background(Color(.lightGray).opacity(0.4))
                    }
                }
            }
        }
    }
}

struct GroupMessageBubble_Previews: PreviewProvider {
    static var previews: some View {
        GroupMessageBubble(message: .init(sender: "Me", name: "you", message: "Hi", time: Date()), name: "Alexander", messages: "hi")
    }
}
