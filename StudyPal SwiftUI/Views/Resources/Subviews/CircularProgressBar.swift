//
//  CircularProgressBar.swift
//  StudyPal SwiftUI
//
//  Created by Don Bouncy on 27/09/2022.
//

import SwiftUI

struct CircularProgressBar: View {
    @ObservedObject var resourceModel: ResourcesViewModel
    @State var status: String
    var body: some View {
        VStack(spacing: 50) {
            Text(status)
                .font(.title2)
                .fontWeight(.semibold)
            ZStack {
                Circle()
                    .stroke(Color.gray, lineWidth: 15)
                    .frame(width: 200, height: 200)
                
                Circle()
                    .trim(from: 0.0, to: resourceModel.progress)
                    .stroke(Color.blue, lineWidth: 15)
                    .frame(width: 200, height: 200)
                    .rotationEffect(Angle(degrees: -90))
                    .animation(.linear, value: resourceModel.progress)
                
                Text("\(Int(resourceModel.progress * 100))%")
                    .font(.custom("HelveticaNeue", size: 20.0))
            }
        }.ignoresSafeArea()
    }
}

struct CircularProgressBar_Previews: PreviewProvider {
    static var previews: some View {
        CircularProgressBar(resourceModel: ResourcesViewModel(), status: "Uploading...")
    }
}
