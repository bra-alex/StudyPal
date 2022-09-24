//
//  CheckboxView.swift
//  StudyPal SwiftUI
//
//  Created by Don Bouncy on 18/07/2022.
//

import SwiftUI

struct CheckboxStyle: ToggleStyle{
    func makeBody (configuration: Configuration) -> some View{
        Button{
            configuration.isOn.toggle()
        } label:{
            HStack{
                Image(systemName: configuration.isOn ? "checkmark.square": "square")
            }
            .tint(.white)
        }
    }
}

extension ToggleStyle where Self == CheckboxStyle {
    static var checklist: CheckboxStyle { .init()
    }
}
