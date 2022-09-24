//
//  SideMenuHeader.swift
//  StudyPal SwiftUI
//
//  Created by Don Bouncy on 25/07/2022.
//

import SwiftUI

struct SideMenuHeader: View {
    var body: some View {
        VStack(alignment: .leading) {
            Image(systemName: "person.circle.fill")
                .resizable()
                .scaledToFill()
                .clipped()
                .frame(width: 64, height: 64)
                .clipShape(Circle())
                .padding(.bottom, 16)
            
            Text("Full Name")
                .font(.system(size: 24, weight: .semibold))
                
            Text("Username")
                .font(.system(size: 14))
                
            HStack {
                Spacer()
            }
            
            Spacer()
        }
        .padding()
    }
}

struct SideMenuHeader_Previews: PreviewProvider {
    static var previews: some View {
        SideMenuHeader()
    }
}
