//
//  CellMiddleView.swift
//  StudyPal SwiftUI
//
//  Created by Don Bouncy on 19/08/2022.
//

import SwiftUI

struct CellMiddleView: View {
    var postContent: String
    var mediaURL: String
    var body: some View {
        VStack(alignment: .leading) {
            Text(postContent)
            
            if !mediaURL.isEmpty{
                AsyncImage(url: URL(string: mediaURL),
                           content: { image in
                    image.resizable()
                },
                           placeholder: {})
                .scaledToFit()
                .frame(height: 300)
                .background(Color(.lightGray).opacity(0.1))
                .cornerRadius(20)
                .padding()
            }
        }
    }
}

struct CellMiddleView_Previews: PreviewProvider {
    static var previews: some View {
        CellMiddleView(postContent: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean nulla quam, pellentesque nec egestas non, molestie ut nisl. Donec in sagittis erat, at congue eros. Vestibulum sit amet semper dui. Aenean scelerisque eleifend eros.", mediaURL: "https://imageio.forbes.com/specials-images/imageserve/5d35eacaf1176b0008974b54/2020-Chevrolet-Corvette-Stingray/0x0.jpg?format=jpg&crop=4560,2565,x790,y784,safe&width=960")
    }
}
