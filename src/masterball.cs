using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.SceneManagement;

public class Circle : MonoBehaviour {

    

    public float speed = 3.0f;
    public ParticleSystem explosion;
    //public ParticleSystem explosion2;

    private float direction = -1;

    //public static int particleDirection2 = 0;

    public ParticleSystem p;

    public GameObject Replay;
    public GameObject Next;
    public GameObject Menu;
    public GameObject Hang;
    public GameObject Text;

    public static float reverse = 0;
    public static float reverse2 = 0;

    
    // Update is called once per frame

    private void Start()
    {
        
    }

    void Update () {


        
        
        if (Input.GetButtonDown("Fire1"))
        {
            Audio2.instance.PlaySound_ballTap();
            if (reverse == 0)
            {
                direction++;

            }
            else if (reverse == 1)
            {
                direction = 3 - direction;
                reverse2++;
                reverse2 = reverse2%2;
                reverse = 0;
                
            }
            
            p.Play();
            
            if (direction == 4)
            {
                direction = 0;
            }

            
        }
        BallControll();


    }

    void BallControll()
    {
        if(reverse2 == 0)
        {
            if (direction == 0)
            {

                transform.Translate(1 * speed * Time.deltaTime, 0, 0);
            }
            else if (direction == 1)
            {

                transform.Translate(0, -1 * speed * Time.deltaTime, 0);
            }
            else if (direction == 2)
            {
                transform.Translate(-1 * speed * Time.deltaTime, 0, 0);
            }
            else if (direction == 3)
            {
                transform.Translate(0, 1 * speed * Time.deltaTime, 0);
            }
            else
            {
                p.Stop();
            }
        }
        else if(reverse2 ==1)
        {
            if (direction == 0)
            {

                transform.Translate(-1 * speed * Time.deltaTime, 0, 0); //0
            }
            else if (direction == 1)
            {

                transform.Translate(0, -1 * speed * Time.deltaTime, 0); //0
            }
            else if (direction == 2)
            {
                transform.Translate(1 * speed * Time.deltaTime, 0, 0); //-
            }
            else if (direction == 3)
            {
                transform.Translate( 0, 1 * speed * Time.deltaTime, 0); //-
            }
            else
            {
                p.Stop();
            }
        }
        
    }

   
    void OnCollisionEnter2D(Collision2D collision)
    {

        if (collision.collider.tag == "Complete")
        {

            Audio2.instance.PlaySound_success();

            ////////////////광고////////////////////
            AdmobManager.instance.ShowBannerAd();

            TextSizeAnimate.message = "GREAT";
            
            p.Stop();            

            reverse = 0;
            reverse2 = 0;

            Text.SetActive(true);
            Next.SetActive(true);
            Replay.SetActive(true);
            Menu.SetActive(true);
            Hang.SetActive(true);
            Destroy(transform.gameObject);
            ///////////////////////////////////////////////////////////////
            if (TitleController.stage< SceneManager.GetActiveScene().buildIndex - 4)
            {
                
                TitleController.stage = SceneManager.GetActiveScene().buildIndex - 4;
                PlayerPrefs.SetFloat("HighScore2",TitleController.stage) ;

            }
           
        }
        else if (collision.collider.tag == "Key")
        {
            Destroy(collision.gameObject);
        }
        else if (collision.collider.tag == "Reverse")
        {

            Destroy(collision.gameObject);
            
            if (reverse == 0)
            {
                reverse++;
            }
            
        }else if (collision.collider.tag == "SpeedUp")
        {
            Destroy(collision.gameObject);
            speed *= 1.5f;
        }
        else if (collision.collider.tag == "SpeedDown")
        {
            Destroy(collision.gameObject);
            speed /= 1.5f;
        }
        else
        {
            Audio2.instance.PlaySound_fail();

            Instantiate(explosion, this.transform.position, Quaternion.identity);

            AdmobManager.instance.ShowBannerAd();

            
            reverse = 0;
            reverse2 = 0;
            Destroy(transform.gameObject);
            TextSizeAnimate.message = "FAIL";
            

            Text.SetActive(true);
            Hang.SetActive(true);
            Menu.SetActive(true);
            Replay.SetActive(true);
        } 
   }
}