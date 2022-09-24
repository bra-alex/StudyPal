//
//  ForumCellView.swift
//  StudyPal SwiftUI
//
//  Created by Don Bouncy on 19/08/2022.
//

import SwiftUI

struct ForumCellView: View {
    
    @State var id : String
    @State var name : String
    @State var username: String
    @State var postContent: String
    @State var mediaURL: String
    @State var date: String
    @State var topic: String
    @State var commentCount: Int
    
    var body: some View {
        HStack() {
            VStack(alignment: .leading, spacing: 5){
                CellTopView(name: $name, username: $username, date: $date)
                CellMiddleView(postContent: $postContent, mediaURL: $mediaURL)
                    .padding(.bottom)
                Reactions(id: $id, topic: $topic, commentCount: $commentCount)
                Spacer()
            }
            Spacer()
        }
    }
}

struct ForumCellView_Previews: PreviewProvider {
    static var previews: some View {
        ForumCellView(id: "biPI19StJa3JuW8HaTMP", name: "Me", username: "you", postContent: "tui", mediaURL: "", date: "Date()", topic: "Hi", commentCount: 3)
    }
}
