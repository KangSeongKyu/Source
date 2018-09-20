using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.SceneManagement;
using GoogleMobileAds.Api;
public class StageController : MonoBehaviour {
    // Use this for initialization
    void Start () {
        Screen.SetResolution(Screen.width, Screen.width * 1000 / 1900, true);
    }
    // Update is called once per frame
    void Update () {

        if (Application.platform == RuntimePlatform.Android)
        {
            if (Input.GetKey(KeyCode.Escape))
            {
                //배너삭제
                AdmobManager.instance.HideBannerAd();
                Audio2.instance.PlaySound_buttonTap(); // 소리

                if (SceneManager.GetActiveScene().buildIndex>=5 && SceneManager.GetActiveScene().buildIndex <= 19)
                {
                    SceneManager.LoadScene(2);
                }else if (SceneManager.GetActiveScene().buildIndex >= 20 && SceneManager.GetActiveScene().buildIndex <= 34)
                {
                    SceneManager.LoadScene(3);
                }
                else if (SceneManager.GetActiveScene().buildIndex >= 35 && SceneManager.GetActiveScene().buildIndex <= 49)
                {
                    SceneManager.LoadScene(4);
                }
            }
        }
    }

    public void RePlay()
    {

        AdmobManager.instance.HideBannerAd();

        Audio2.instance.PlaySound_buttonTap();

        SceneManager.LoadScene(SceneManager.GetActiveScene().buildIndex);
    }

    public void Next()
    {

        AdmobManager.instance.HideBannerAd();

        Audio2.instance.PlaySound_buttonTap();

        SceneManager.LoadScene(SceneManager.GetActiveScene().buildIndex+1);
    }

    public void Menu()
    {

        AdmobManager.instance.HideBannerAd();


        Audio2.instance.PlaySound_buttonTap();

        SceneManager.LoadScene(2);
    }


    public void Menu2()
    {
        AdmobManager.instance.HideBannerAd();

        Audio2.instance.PlaySound_buttonTap();

        SceneManager.LoadScene(3);
    }

    public void Menu3()
    {
        AdmobManager.instance.HideBannerAd();

        Audio2.instance.PlaySound_buttonTap();

        SceneManager.LoadScene(4);
    }
}
