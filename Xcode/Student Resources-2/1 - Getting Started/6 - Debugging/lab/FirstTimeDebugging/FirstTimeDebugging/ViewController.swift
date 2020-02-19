import UIKit

class ViewController: UIViewController {
    
    
    let myFirstLabel = UILabel(frame: CGRect(x: 100, y: 100, width: 200, height: 44))
    var lightOn = true
    
    let myFirstButton = UIButton(frame: CGRect(x: 200, y: 200, width: 200, height: 44))


    
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view, typically from a nib.
        updateUI()

        myFirstButton.backgroundColor = .blue
        
        view.addSubview(myFirstButton)
 
        myFirstButton.addTarget(self, action: #selector(buttonPressed), for: .touchUpInside)
        
//        let rect = CGRect(x: 10, y: 10, width: 100, height: 100)
//        let myView = UIView(frame: rect)
//        myView.backgroundColor = .black
//        self.view.addSubview(myView)
    }
        
    @objc func buttonPressed(sender:myUIButton) {
            lightOn.toggle()
            updateUI()

     }
    
    func updateUI() {
        view.backgroundColor = lightOn ? .white : .black
        myFirstButton.setTitle(lightOn ? "Off" : "On", for: .normal)
        
    }
    
    override func viewWillAppear(_ animated: Bool) {
        super.viewWillAppear(true)
        if animated {
            
        }
    }
    
    func someMethod() {

    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
}



