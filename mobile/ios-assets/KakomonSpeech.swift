import AVFoundation
import Capacitor
import UIKit

@objc(KakomonSpeech)
public class KakomonSpeech: CAPPlugin, CAPBridgedPlugin, AVSpeechSynthesizerDelegate {
    public let identifier = "KakomonSpeech"
    public let jsName = "KakomonSpeech"
    public let pluginMethods: [CAPPluginMethod] = [
        CAPPluginMethod(name: "available", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "speak", returnType: CAPPluginReturnCallback),
        CAPPluginMethod(name: "stop", returnType: CAPPluginReturnPromise)
    ]

    private struct Reading {
        let id: String
        let call: CAPPluginCall
        let utterance: AVSpeechUtterance
        let category: AVAudioSession.Category
        let mode: AVAudioSession.Mode
        let options: AVAudioSession.CategoryOptions
    }
    private let synthesizer = AVSpeechSynthesizer()
    private let session = AVAudioSession.sharedInstance()
    private var current: Reading?

    public override func load() {
        synthesizer.delegate = self
        synthesizer.usesApplicationAudioSession = true
        NotificationCenter.default.addObserver(self, selector: #selector(backgrounded),
            name: UIApplication.didEnterBackgroundNotification, object: nil)
        NotificationCenter.default.addObserver(self, selector: #selector(interrupted(_:)),
            name: AVAudioSession.interruptionNotification, object: session)
    }

    private func voice(for lang: String) -> AVSpeechSynthesisVoice? {
        let language = Locale(identifier: lang).languageCode
        return AVSpeechSynthesisVoice.speechVoices()
            .filter { Locale(identifier: $0.language).languageCode == language }
            .max { lhs, rhs in
                if lhs.quality != rhs.quality { return lhs.quality.rawValue < rhs.quality.rawValue }
                return lhs.language != lang && rhs.language == lang
            }
    }

    @objc func available(_ call: CAPPluginCall) {
        DispatchQueue.main.async {
            call.resolve(["available": self.voice(for: call.getString("lang") ?? "ja-JP") != nil])
        }
    }

    @objc func speak(_ call: CAPPluginCall) {
        DispatchQueue.main.async {
            guard let id = call.getString("id"), !id.isEmpty, id.count <= 64,
                  let text = call.getString("text"), !text.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty,
                  let voice = self.voice(for: call.getString("lang") ?? "ja-JP"),
                  let rate = call.getFloat("rate"), (0.5...2).contains(rate) else {
                call.reject("読み上げを開始できません。")
                return
            }
            self.finish("canceled", stop: true)
            let utterance = AVSpeechUtterance(string: text)
            utterance.voice = voice
            utterance.rate = min(AVSpeechUtteranceMaximumSpeechRate,
                                 max(AVSpeechUtteranceMinimumSpeechRate, AVSpeechUtteranceDefaultSpeechRate * rate))
            let session = self.session
            let reading = Reading(id: id, call: call, utterance: utterance, category: session.category,
                                  mode: session.mode, options: session.categoryOptions)
            do {
                try session.setCategory(.playback, mode: .spokenAudio, options: [.duckOthers])
                try session.setActive(true)
            } catch {
                if session.category == .playback && session.mode == .spokenAudio {
                    try? session.setCategory(reading.category, mode: reading.mode, options: reading.options)
                }
                call.reject("音声を再生できません。")
                return
            }
            self.current = reading
            self.synthesizer.speak(utterance)
        }
    }

    @objc func stop(_ call: CAPPluginCall) {
        DispatchQueue.main.async {
            if let id = call.getString("id"), self.current?.id == id {
                self.finish("canceled", stop: true)
            }
            call.resolve()
        }
    }

    private func finish(_ state: String, stop: Bool = false) {
        guard let reading = current else { return }
        current = nil
        if stop { synthesizer.stopSpeaking(at: .immediate) }
        if session.category == .playback && session.mode == .spokenAudio {
            try? session.setActive(false, options: .notifyOthersOnDeactivation)
            try? session.setCategory(reading.category, mode: reading.mode, options: reading.options)
        }
        reading.call.keepAlive = false
        reading.call.resolve(["state": state])
        bridge?.releaseCall(reading.call)
    }

    @objc private func backgrounded() { finish("canceled", stop: true) }

    @objc private func interrupted(_ notice: Notification) {
        guard let type = notice.userInfo?[AVAudioSessionInterruptionTypeKey] as? UInt,
              type == AVAudioSession.InterruptionType.began.rawValue else { return }
        DispatchQueue.main.async { self.finish("canceled", stop: true) }
    }

    public func speechSynthesizer(_ synthesizer: AVSpeechSynthesizer, didStart utterance: AVSpeechUtterance) {
        DispatchQueue.main.async {
            guard let reading = self.current, reading.utterance === utterance else { return }
            reading.call.keepAlive = true
            reading.call.resolve(["state": "started"])
        }
    }

    public func speechSynthesizer(_ synthesizer: AVSpeechSynthesizer, didFinish utterance: AVSpeechUtterance) {
        DispatchQueue.main.async {
            if self.current?.utterance === utterance { self.finish("finished") }
        }
    }

    public func speechSynthesizer(_ synthesizer: AVSpeechSynthesizer, didCancel utterance: AVSpeechUtterance) {
        DispatchQueue.main.async {
            if self.current?.utterance === utterance { self.finish("canceled") }
        }
    }
}
