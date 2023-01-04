//
//  CommentsViewBottom.swift
//  StudyPal SwiftUI
//
//  Created by Don Bouncy on 01/09/2022.
//

import SwiftUI

struct CommentsViewBottomView: View{
    @ObservedObject var forumsVM: ForumsViewModel
    
    @State var textEditorHeight : CGFloat = 20
    let id: String
    
    var body: some View{
        HStack(spacing: 13) {
            ZStack {
                Text(forumsVM.postContent)
                    .font(.system(.body))
                    .foregroundColor(.clear)
                    .padding(.top, 14)
                    .background(GeometryReader {
                        Color.clear.preference(key: CommentBottomHeight.self,
                                               value: $0.frame(in: .local).size.height)
                    })

                TextEditor(text: $forumsVM.postContent)
                    .font(.system(.body))
                    .frame(height: max(40,textEditorHeight))
                    .padding(.leading, 4.0)
                    .padding(.vertical, 4.0)
                    .overlay {
                        if forumsVM.postContent.isEmpty{
                            HStack {
                                Text("Comment")
                                    .padding(.leading, 9)
                                    .opacity(0.5)
                                Spacer()
                            }
                        }
                        RoundedRectangle(cornerRadius: 25).stroke(Color(.lightGray))
                    }
            }.onPreferenceChange(CommentBottomHeight.self) { textEditorHeight = $0 }

            Button {
                forumsVM.createComment(id)
                forumsVM.postContent = ""
            } label: {
                Image(systemName: "paperplane.circle.fill")
                    .font(.system(size: 30))
            }
            .opacity(forumsVM.postContent.isEmpty ? 0.5 : 1 )
            .disabled(forumsVM.postContent.isEmpty)
            .animation(.easeInOut(duration: 0.2), value: forumsVM.postContent.isEmpty)
        }
        .padding(8)

    }
}

struct CommentBottomHeight: PreferenceKey {
    static var defaultValue: CGFloat { 0 }
    static func reduce(value: inout Value, nextValue: () -> Value) {
        value = value + nextValue()
    }
}
