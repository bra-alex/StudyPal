//
//  ChatRow.swift
//  StudyPal SwiftUI
//
//  Created by Don Bouncy on 16/08/2022.
//

import SwiftUI

struct ChatRow: View {
    let recentMessages: RecentMessages
    var body: some View {
        HStack(spacing: 16){
            AsyncImage(url: URL(string: recentMessages.profileImageUrl), content: { image in
                image.resizable()
            }, placeholder: {})
                .frame(width: 50, height: 50)
                .clipShape(Circle())
            
            ZStack {
                VStack(alignment: .leading, spacing: 5) {
                    HStack{
                        Text(recentMessages.name)
                            .font(.system(size: 16, weight: .bold))
                            .foregroundColor(Color(.label))
                        
                        Spacer()
                        
                        Text(recentMessages.timeAgo)
                            .font(.system(size: 14, weight: .bold))
                    }
                    
                    HStack{
                        Text(recentMessages.message)
                            .font(.system(size: 14))
                            .foregroundColor(Color(.lightGray))
                            .lineLimit(2)
                            .frame(height: 30, alignment: .top)
                            .frame(maxWidth: .infinity, alignment: .leading)
                            .padding(.trailing, 40)
                    }
                }
//                Circle()
//                    .foregroundColor(recentMessages.unread ? .blue : .clear)
//                    .frame(width: 18, height: 18)
//                    .frame(maxWidth: .infinity, alignment: .trailing)
            }
            
//            VStack{
//
//
//                Text("")
//                    .font(.system(size: 14, weight: .bold))
//                    .foregroundColor(.white)
//                    .padding(.horizontal, 9)
//                    .padding(.vertical, 4)
//                    .background(Color("BasicColor"))
//                    .clipShape(RoundedRectangle(cornerRadius: 50))
//
//
//            }
        }.frame(height: 50)
    }
}


struct ChatRow_Previews: PreviewProvider {
    static var previews: some View {
        ChatRow(recentMessages: .init(sender: "KsSaQG1t5Kg5UMRcwW8qbF6LI2B3", receipient: "btllqsJxHxZFYalecGyPQp2zZlI2", name: "Alexander", timestamp: Date(), message: "🤝🏿", profileImageUrl: "https://firebasestorage.googleapis.com:443/v0/b/studypal-swiftui.appspot.com/o/btllqsJxHxZFYalecGyPQp2zZlI2?alt=media&token=da46830c-f91e-40a6-a53e-9b066de2ab88", type: "Received"))
    }
}
