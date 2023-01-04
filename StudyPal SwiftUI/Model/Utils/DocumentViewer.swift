//
//  DocumentViewer.swift
//  StudyPal SwiftUI
//
//  Created by Don Bouncy on 28/09/2022.
//

import Foundation
import SwiftUI
import UIKit

class DocumentViewer: NSObject, ObservableObject, UIDocumentInteractionControllerDelegate {
    let controller = UIDocumentInteractionController()
    func presentDocument(url: URL) {
        controller.delegate = self
        controller.url = url
        controller.presentPreview(animated: true)
    }

    func documentInteractionControllerViewControllerForPreview(_: UIDocumentInteractionController) -> UIViewController {
        return UIApplication.shared.currentUIWindow()!.rootViewController!
    }
}
