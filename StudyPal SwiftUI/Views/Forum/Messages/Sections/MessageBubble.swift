//
//  MessageBubble.swift
//  StudyPal SwiftUI
//
//  Created by Don Bouncy on 10/08/2022.
//

import SwiftUI

struct MessageBubble: View {
    let messages: Message
    var body: some View {
        VStack{
            if messages.sender == FirebaseManager.shared.auth.currentUser?.uid{
                ChatBubble(direction: .right) {
                    Text(messages.message)
                        .padding(.horizontal, 15)
                        .padding(.vertical, 10)
                        .foregroundColor(.white)
                        .background(Color.blue)
                }
            } else {
                ChatBubble(direction: .left) {
                    Text(messages.message)
                        .padding(.horizontal, 15)
                        .padding(.vertical, 10)
                        .foregroundColor(.black)
                        .background(Color(.lightGray).opacity(0.4))
                }
            }
            
        }
    }
}

struct MessageBubble_Previews: PreviewProvider {
    static var previews: some View {
        MessageBubble(messages: .init(sender: "you", receipient: "me", message: "us", time: Date()))
    }
}
