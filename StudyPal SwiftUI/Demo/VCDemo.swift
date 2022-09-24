//
//  VCDemo.swift
//  StudyPal SwiftUI
//
//  Created by Don Bouncy on 06/09/2022.
//

import SwiftUI
import AgoraUIKit
import AgoraRtcKit

struct VCDemo: View {
    @Environment(\.presentationMode) var presentationMode
    @State private var connectedToChannel = false
    var agview: AgoraViewer {
        let agoraView = AgoraViewer(
            connectionData: AgoraConnectionData(
                appId: "4a3d878fa2324f2eb9dc7b6e1bab090b",
                rtcToken: "007eJxTYPiv0uaVrbrbcNJV5+9SpwPWXHVNPKQc0JZv+FI5c7G+6gsFBpNE4xQLc4u0RCNjI5M0o9Qky5Rk8ySzVMOkxCQDS4Oktx3iyTm3JJJvf1nJzMgAgSA+O0NeanlIanEJAwMA4tQjhg=="
            ),
            style: .floating
        )
        agoraView.join(channel: "test", with: nil, as: .broadcaster)
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

//struct VCDemo: View {
//
//    @State private var connectedToChannel = false
//
//       static var agview = AgoraViewer(
//           connectionData: AgoraConnectionData(
//               appId: "4a3d878fa2324f2eb9dc7b6e1bab090b",
//               rtcToken: "007eJxTYPiv0uaVrbrbcNJV5+9SpwPWXHVNPKQc0JZv+FI5c7G+6gsFBpNE4xQLc4u0RCNjI5M0o9Qky5Rk8ySzVMOkxCQDS4Oktx3iyTm3JJJvf1nJzMgAgSA+O0NeanlIanEJAwMA4tQjhg=="
//           ),
//           style: .floating
//       )
//
//       @State private var agoraViewerStyle = 0
//       var body: some View {
//           ZStack {
//               VCDemo.agview
//               VStack {
//                   Picker("Format", selection: $agoraViewerStyle) {
//                       Text("Floating").tag(0)
//                       Text("Grid").tag(1)
//                   }.pickerStyle(SegmentedPickerStyle())
//                   .frame(
//                       minWidth: 0, idealWidth: 100, maxWidth: 200,
//                       minHeight: 0, idealHeight: 40, maxHeight: .infinity, alignment: .topTrailing
//                   ).onChange(
//                       of: agoraViewerStyle,
//                       perform: {
//                           VCDemo.agview.viewer.style = $0 == 0 ? .floating : .grid
//                       }
//                   )
//                   Spacer()
//                   HStack {
//                       Spacer()
//                       Button(
//                           action: { connectToAgora() },
//                           label: {
//                               if connectedToChannel {
//                                   Text("Disconnect").padding(3.0).background(Color.red).cornerRadius(3.0).hidden()
//                               } else {
//                                   Text("Connect").padding(3.0).background(Color.green).cornerRadius(3.0)
//                               }
//                           }
//                       )
//                       Spacer()
//                   }
//                   Spacer()
//               }
//           }
//
//       }
//
//       func connectToAgora() {
//           connectedToChannel.toggle()
//           if connectedToChannel {
//               VCDemo.agview.join(channel: "newTest", with: "007eJxTYPiv0uaVrbrbcNJV5+9SpwPWXHVNPKQc0JZv+FI5c7G+6gsFBpNE4xQLc4u0RCNjI5M0o9Qky5Rk8ySzVMOkxCQDS4Oktx3iyTm3JJJvf1nJzMgAgSA+O0NeanlIanEJAwMA4tQjhg==", as: .broadcaster)
//           } else {
//               VCDemo.agview.viewer.leaveChannel()
//           }
//       }
//}

struct VCDemo_Previews: PreviewProvider {
    static var previews: some View {
        VCDemo()
    }
}
