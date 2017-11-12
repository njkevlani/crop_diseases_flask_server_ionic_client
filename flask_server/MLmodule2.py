from sklearn.externals import joblib
import cv2
import numpy as np

cures = {
    'Apple___Apple_scab' : 'Rake under trees and destroy infected leaves to reduce the number of fungal spores available to start the disease cycle over again next spring. Water in the evening or early morning hours (avoid overhead irrigation) to give the leaves time to dry out before infection can occur.',
    'Apple___Black_rot' : 'Over time, the spots expand and heavily infected leaves drop from the tree. Infected branches or limbs will show characteristic red-brown sunken areas that expand each year. Fruit infection is the most destructive form of this pathogen and begins with infected flowers, before fruits expand.',
    'Apple___Cedar_apple_rust' : 'Remove galls from infected junipers. In some cases, juniper plants should be removed entirely. Apply preventative, disease-fighting fungicides labeled for use on apples weekly, starting with bud break, to protect trees from spores being released by the juniper host.',
    'Apple___healthy' : 'Apple crop is healthy.',
    'Tomato___Bacterial_spot' : '',
    'Tomato___Early_blight' : '',
    'Tomato___healthy' : '',
    'Tomato___Late_blight' : '',
    'Tomato___Leaf_Mold' : '',
    'Tomato___Septoria_leaf_spot' : '',
    'Tomato___Spider_mites Two-spotted_spider_mite' : '',
    'Tomato___Target_Spot' : '',
    'Tomato___Tomato_mosaic_virus' : '',
    'Tomato___Tomato_Yellow_Leaf_Curl_Virus' : '',
}

clf = joblib.load('Classifier.pkl')

def find_disease():
    test_img = cv2.imread('userUploads/tempFile.png')
    test_img = cv2.resize(test_img, (32, 32))
    test_img = np.reshape(test_img, (1, np.product(test_img.shape)))
    return clf.predict([test_img[0]])[0]

if __name__ == '__main__':
    d = find_disease()
    print(d)
    print("Cures: ", cures)
