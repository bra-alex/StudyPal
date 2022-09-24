//
//  DocDemo.swift
//  StudyPal SwiftUI
//
//  Created by Don Bouncy on 28/09/2022.
//

import SwiftUI
import UIKit

struct DocumentView: View {
//  @StateObject var documentController = DocumentController()

  var body: some View {
      Button(action: {
//          documentController.presentDocument(url: URL(filePath: "file:///Users/alexanderboakye/Library/Developer/CoreSimulator/Devices/13D81A62-92A2-41C8-AEF9-B1982C7DBA6B/data/Containers/Data/Application/5A542CD9-7DE4-47C2-ACC8-6649690592A0/Documents.KNUST_WIFI.mobileconfig"))
      }, label: {
          Text("Show Doc")
      })
  }
}

struct DocumentView_Previews: PreviewProvider {
    static var previews: some View {
        DocumentView()
    }
}
