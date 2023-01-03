//
//  GroupChatRow.swift
//  StudyPal SwiftUI
//
//  Created by Don Bouncy on 17/08/2022.
//

import SwiftUI

struct GroupChatRow: View {
    @ObservedObject var groupMessagesVM: GroupMessageViewModel
    let groupInfo: GroupChatModel
    
    init(groupInfo: GroupChatModel){
        self.groupInfo = groupInfo
        self.groupMessagesVM = .init(groupID: groupInfo.id ?? "doc")
        groupMessagesVM.fetchMessages()
    }
    
    var body: some View {
        VStack(alignment: .leading) {
            HStack{
                Text(groupInfo.title)
                    .fontWeight(.bold)
                
                Spacer()
                
                Text(groupMessagesVM.messages.last?.time.descriptiveString() ?? "")
                    .foregroundColor(Color.gray)
                    .font(.subheadline)
            }
            .padding(.bottom, 2)
            
            HStack(spacing: 0) {
                if let msg = groupMessagesVM.messages.last?.name{
                    Text("\(msg): ")
                        .foregroundColor(Color(.lightGray))
                        .fontWeight(.bold)
                        .font(.subheadline)
                }else{
                    Text("")
                }
                
                Text(groupMessagesVM.messages.last?.message ?? "")
                    .foregroundColor(Color(.lightGray))
                    .frame(maxWidth: .infinity, alignment: .leading)
                    .font(.subheadline)
                .lineLimit(2)
            }
        }
    }
}

struct GroupChatRow_Previews: PreviewProvider {
    static var previews: some View {
        GroupChatRow(groupInfo: .init(title: "New Chat", joinCode: 9, isPublic: true, time: Date(), users: [""]))
    }
}
