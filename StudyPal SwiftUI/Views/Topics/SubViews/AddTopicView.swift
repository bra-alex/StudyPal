//
//  AddTopicView.swift
//  StudyPal SwiftUI
//
//  Created by Don Bouncy on 21/08/2022.
//

import SwiftUI

struct AddTopicView: View {
    @Binding var addTopic: Bool
    @Binding var text: String
    @ObservedObject var topicsVM: TopicsViewModel
    var body: some View {
        ZStack {
            Color.black
                .ignoresSafeArea()
                .opacity(0.3)
                .onTapGesture {
                    addTopic.toggle()
                    text = ""
                }
            
            VStack{
                Text("Add a topic")
                    .fontWeight(.bold)
                    .padding([.top, .horizontal])
                    .foregroundColor(Color("BasicColor"))
                
                TextField("", text: $text)
                    .padding()
                    .background{
                        RoundedRectangle(cornerRadius: 25).stroke(Color("BasicColor"), lineWidth: 1)
                    }
                    .cornerRadius(25)
                    .padding()
                    .overlay(alignment: .leading) {
                        if text.isEmpty{
                            Text("Topic")
                                .foregroundColor(.gray.opacity(0.9))
                                .padding(.leading, 32)
                        }
                    }
                
                Button {
                    topicsVM.createTopic()
                } label: {
                    Text("Done")
                        .foregroundColor(.white)
                        .fontWeight(.bold)
                }
                .frame(width: UIScreen.main.bounds.width - 200, height: 30)
                .padding(.vertical, 10)
                .background(Color("BasicColor"))
                .cornerRadius(25)
                
                Button {
                    addTopic.toggle()
                    text = ""
                } label: {
                    Text("Cancel")
                        .foregroundColor(.black)
                }
                .frame(width: UIScreen.main.bounds.width - 100, height: 30)
                .padding(.vertical)


            }
            .padding(.vertical)
            .frame(width: UIScreen.main.bounds.width - 100)
            .background(.white)
        .cornerRadius(25)
        }
        
    }
}

struct AddTopicView_Previews: PreviewProvider {
    static var previews: some View {
        AddTopicView(addTopic: .constant(true), text: .constant(""), topicsVM: .init(user: .none))
    }
}
