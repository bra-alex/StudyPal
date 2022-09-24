//
//  CloseBtnView.swift
//  StudyPal SwiftUI
//
//  Created by Don Bouncy on 19/07/2022.
//

import SwiftUI

struct CloseBtnView: View {
    var color: Color
    var body: some View {
            Image(systemName: "chevron.backward")
                .font(.title)
                .foregroundColor(color)
                .padding()
        
    }
    
}

struct CloseBtnView_Previews: PreviewProvider {
    static var previews: some View {
        CloseBtnView(color: .black)
            .previewLayout(.sizeThatFits)
    }
}
