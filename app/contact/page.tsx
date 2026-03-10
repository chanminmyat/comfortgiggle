import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

export default function ContactPage() {
  return (
    <div className='min-h-screen flex flex-col'>
      <Header />

      <main className='flex-1'>
        <section className='relative h-[300px] flex items-center justify-center overflow-hidden'>
          <div
            className='absolute inset-0 bg-cover bg-center'
            style={{
              backgroundImage:
                "url(https://images.pexels.com/photos/1660195/pexels-photo-1660195.jpeg?auto=compress&cs=tinysrgb&w=1920)",
            }}
          >
            <div className='absolute inset-0 bg-gradient-to-r from-black/70 to-black/40'></div>
          </div>

          <div className='relative z-10 container mx-auto px-4 text-center text-white'>
            <h1 className='text-5xl md:text-6xl font-bold mb-4'>Contact Us</h1>
            <p className='text-xl md:text-2xl'>We'd love to hear from you</p>
          </div>
        </section>

        <section className='py-20'>
          <div className='container mx-auto px-4'>
            <div className='grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12'>
              <Card className='text-center'>
                <CardContent className='p-8'>
                  <div className='inline-flex items-center justify-center w-16 h-16 rounded-full bg-amber-100 text-amber-700 mb-4'>
                    <Phone className='h-8 w-8' />
                  </div>
                  <h3 className='text-xl font-semibold mb-2'>Phone</h3>
                  <p className='text-gray-600 mb-2'>Give us a call</p>
                  <a
                    href='tel:+12028007298'
                    className='text-amber-700 hover:underline'
                  >
                    1-202-800-7298
                  </a>
                </CardContent>
              </Card>

              <Card className='text-center'>
                <CardContent className='p-8'>
                  <div className='inline-flex items-center justify-center w-16 h-16 rounded-full bg-amber-100 text-amber-700 mb-4'>
                    <Mail className='h-8 w-8' />
                  </div>
                  <h3 className='text-xl font-semibold mb-2'>Email</h3>
                  <p className='text-gray-600 mb-2'>Send us a message</p>
                  <a
                    href='mailto:hello@comfortgiggle.com'
                    className='text-amber-700 hover:underline'
                  >
                    hello@comfortgiggle.com
                  </a>
                </CardContent>
              </Card>

              <Card className='text-center'>
                <CardContent className='p-8'>
                  <div className='inline-flex items-center justify-center w-16 h-16 rounded-full bg-amber-100 text-amber-700 mb-4'>
                    <MapPin className='h-8 w-8' />
                  </div>
                  <h3 className='text-xl font-semibold mb-2'>Location</h3>
                  <p className='text-gray-600'>
                    8 The Green Suite B<br />
                    Dover, DE 19901
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className='grid grid-cols-1 lg:grid-cols-2 gap-12'>
              <div>
                <h2 className='text-3xl font-bold mb-6'>Get In Touch</h2>
                <p className='text-gray-600 mb-8'>
                  Have a question about candle scents, shipping, or gift sets?
                  Fill out the form below and our team will get back to you within 24 hours.
                </p>

                <Card>
                  <CardContent className='p-6'>
                    <form className='space-y-4'>
                      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                        <div>
                          <Label htmlFor='firstName'>First Name *</Label>
                          <Input id='firstName' required />
                        </div>
                        <div>
                          <Label htmlFor='lastName'>Last Name *</Label>
                          <Input id='lastName' required />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor='email'>Email *</Label>
                        <Input id='email' type='email' required />
                      </div>

                      <div>
                        <Label htmlFor='phone'>Phone</Label>
                        <Input id='phone' type='tel' />
                      </div>

                      <div>
                        <Label htmlFor='subject'>Subject *</Label>
                        <Input id='subject' required />
                      </div>

                      <div>
                        <Label htmlFor='message'>Message *</Label>
                        <Textarea
                          id='message'
                          rows={6}
                          required
                          placeholder='Tell us how we can help you...'
                        />
                      </div>

                      <Button
                        type='submit'
                        size='lg'
                        className='w-full bg-amber-600 hover:bg-amber-700'
                      >
                        Send Message
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>

              <div>
                <h2 className='text-3xl font-bold mb-6'>Business Hours</h2>
                <Card className='mb-6'>
                  <CardContent className='p-6'>
                    <div className='flex items-start mb-4'>
                      <Clock className='h-6 w-6 text-amber-700 mr-3 flex-shrink-0 mt-1' />
                      <div className='flex-1'>
                        <h3 className='font-semibold mb-4'>Store Hours</h3>
                        <div className='space-y-2 text-gray-600'>
                          <div className='flex justify-between'>
                            <span>Monday - Friday</span>
                            <span className='font-medium'>
                              9:00 AM - 5:00 PM EST
                            </span>
                          </div>
                          <div className='flex justify-between'>
                            <span>Saturday</span>
                            <span className='font-medium'>
                              10:00 AM - 3:00 PM EST
                            </span>
                          </div>
                          <div className='flex justify-between'>
                            <span>Sunday</span>
                            <span className='font-medium'>Closed</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className='relative h-[400px] rounded-lg overflow-hidden'>
                  <img
                    src='https://images.pexels.com/photos/4207892/pexels-photo-4207892.jpeg?auto=compress&cs=tinysrgb&w=800'
                    alt='Candle studio shelves'
                    className='w-full h-full object-cover'
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
