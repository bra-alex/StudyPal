//
//  CellTopView.swift
//  StudyPal SwiftUI
//
//  Created by Don Bouncy on 19/08/2022.
//

import SwiftUI

struct CellTopView: View {
    var name: String
    var username: String
    var date: String
    var body: some View {
        HStack{
//            AsyncImage(url: URL(string: profileImageUrl), content: { image in
//                image.resizable()
//            }, placeholder: {})
//            .aspectRatio(contentMode: .fit)
//            .clipped()
//            .frame(width: 50, height: 50)
//            .clipShape(Circle())
            
            HStack(alignment: .center, spacing: 0) {
                Text(name)
                    .font(.headline)
                
                Text("@\(username)")
                    .font(.subheadline)
                    .foregroundColor(.gray)
                    .padding(.leading, 3)
                
                Text("・\(date)")
                    .foregroundColor(.gray)
                    .font(.callout)
            }
        }
    }
}

struct CellTopView_Previews: PreviewProvider {
    static var previews: some View {
        CellTopView(name: "Alexander", username: "@bredaalex", date: "Date()")
    }
}
