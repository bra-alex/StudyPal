//
//  VideoCallView.swift
//  StudyPal SwiftUI
//
//  Created by Don Bouncy on 01/09/2022.
//

import SwiftUI
import AgoraUIKit

struct CallView: View {
    @Environment(\.presentationMode) var presentationMode
    @State private var connectedToChannel = false
    var agview: AgoraViewer {
        let agoraView = AgoraViewer(
            connectionData: AgoraConnectionData(
                appId: "4a3d878fa2324f2eb9dc7b6e1bab090b",
                rtcToken: "007eJxTYKjYbb/55pQTHy7Ip2rs5+JsrXVmCbyu4L1mQk3G3FkfWvsVGEwSjVMszC3SEo2MjUzSjFKTLFOSzZPMUg2TEpMMLA2SzP+ZJ2/zt0xe7WrMysgAgSA+O0NeanlIanEJAwMA8Ogihw=="
            ),
            style: .floating
        )
        agoraView.join(channel: "newTest", with: "007eJxTYKjYbb/55pQTHy7Ip2rs5+JsrXVmCbyu4L1mQk3G3FkfWvsVGEwSjVMszC3SEo2MjUzSjFKTLFOSzZPMUg2TEpMMLA2SzP+ZJ2/zt0xe7WrMysgAgSA+O0NeanlIanEJAwMA8Ogihw==", as: .broadcaster)
        //      agoraView.viewer.join(channel: "newTest", with: "007eJxTYPiv0uaVrbrbcNJV5+9SpwPWXHVNPKQc0JZv+FI5c7G+6gsFBpNE4xQLc4u0RCNjI5M0o9Qky5Rk8ySzVMOkxCQDS4Oktx3iyTm3JJJvf1nJzMgAgSA+O0NeanlIanEJAwMA4tQjhg==", as: .broadcaster)
        return agoraView
    }
    var body: some View {
        ZStack(alignment: .topTrailing) {
            agview
            Button {
                agview.viewer.leaveChannel()
                presentationMode.wrappedValue.dismiss()
            } label: {
                Text("Leave")
                    .foregroundColor(.white)
                    .padding(9)
                    .background(Color.red)
                    .cornerRadius(10)
            }.padding()
            
        }
    }
}

struct CallView_Previews: PreviewProvider {
    static var previews: some View {
        CallView()
    }
}
