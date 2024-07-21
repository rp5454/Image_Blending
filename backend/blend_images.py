import sys
import cv2

def blend_images(image1_path, image2_path):
    image1 = cv2.imread(image1_path, cv2.IMREAD_UNCHANGED)
    image2 = cv2.imread(image2_path, cv2.IMREAD_UNCHANGED)

    blended = cv2.addWeighted(image1, 0.5, image2, 0.5, 0)
    blended_image_path = 'uploads/blended.png'
    cv2.imwrite(blended_image_path, blended)
    return blended_image_path

if __name__ == '__main__':
    image1_path = sys.argv[1]
    image2_path = sys.argv[2]
    result = blend_images(image1_path, image2_path)
    print(result)
