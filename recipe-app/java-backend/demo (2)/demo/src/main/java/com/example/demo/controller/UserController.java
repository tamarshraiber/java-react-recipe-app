//package com.example.demo.controller;
//
//import com.example.demo.model.User;
//import com.example.demo.servies.UserRepository;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.HttpStatusCode;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.List;
//
//@RestController
//@RequestMapping("api/user")
//@CrossOrigin
//public class UserController {
//
//    private UserRepository userRepository;
//
//    public UserController(UserRepository userRepository) {
//        this.userRepository = userRepository;
//    }
//
//    @GetMapping("users")
//    public ResponseEntity <List<User>> getUsers() {
//        return new ResponseEntity<>(userRepository.findAll(), HttpStatus.OK);
//    }
//
//    @GetMapping("/getUserById/{id}")
//    public ResponseEntity<User> getUserById(@PathVariable Long id){
//        User u=userRepository.findById(id).orElse(null);
//        if(u==null)
//            return new ResponseEntity<>(u,HttpStatus.NOT_FOUND);
//        return new ResponseEntity<>(u,HttpStatus.OK);
//    }
//
//    @PostMapping("/addUser")
//    public ResponseEntity<User> addUser(@RequestBody User u){
//        User newUser = userRepository.save(u);
//        return new ResponseEntity<>(newUser,HttpStatus.CREATED);
//    }
//
//    @PutMapping("/updateUser/{id}")
//    public ResponseEntity<User> updateUser(@RequestBody User u,@PathVariable Long id){
//        User u2=userRepository.findById(id).orElse(null);
//        if(u2==null)
//            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
////        u2.setFirstName(u.getFirstName());
////        u2.setLastName(u.getLastName());
//        u2.setUserName(u.getUserName());
//        u2.setEmail(u.getEmail());
//        u2.setPassword(u.getPassword());
//        u2=userRepository.save(u);
//        return new ResponseEntity<>(u2, HttpStatus.CREATED);
//    }
//
//    @DeleteMapping("/deleteUser/{id}")
//    public ResponseEntity deleteUser(@PathVariable Long id){
//        User u=userRepository.findById(id).orElse(null);
//        if(u==null)
//            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
//        userRepository.delete(u);
//        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
//    }
//
//    @PostMapping("/login")
//    public ResponseEntity<User> login(@RequestBody User u){
//    List <User> users=userRepository.findAll();
//    for ( User user : users ) {
////        if(user.getFirstName().equals(u.getFirstName()))
////            if(user.getLastName().equals(u.getLastName()))
//        if(user.getUserName().equals(u.getUserName()))
//                if(user.getPassword().equals(u.getPassword()))
//                    return new ResponseEntity<>(user,HttpStatus.OK);
//                else
//                    return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
//    }
//    return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
//    }
//
//
//    @PostMapping("/signUp")
//    public ResponseEntity<User> signUp(@RequestBody User u){
//        List <User> users=userRepository.findAll();
//        for ( User user : users ) {
//            String e1=user.getEmail();
//            String e2=u.getEmail();
//            if(e1.equals(e2))
//                return new ResponseEntity<>(user,HttpStatus.CONFLICT);
//        }
//        User user=userRepository.save(u);
//        System.out.println("libby");
//        return new ResponseEntity<>(user,HttpStatus.CREATED);
//    }
//
//}














package com.example.demo.controller;
import com.example.demo.model.Role;
import com.example.demo.model.User;
//import java.util.Optional;
//import com.example.demo.model.Users;
import com.example.demo.security.CustomUserDetails;
import com.example.demo.security.jwt.JwtUtils;
//import com.example.demo.service.RoleRepository;
//import com.example.demo.service.UserRepository;
import com.example.demo.servies.RecipeBookRepository;
import com.example.demo.servies.RoleRepository;
import com.example.demo.servies.UserRepository;
import jakarta.validation.Valid;
import org.apache.catalina.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
//import com.example.demo.service.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.security.core.AuthenticationException;


@RestController
@RequestMapping("/api/user")
public class UserController {
    @Autowired
    JwtUtils jwtUtils;

    @Autowired
    AuthenticationManager authenticationManager;
    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    UserRepository userRepository;
    @Autowired
    private RecipeBookRepository recipeBookRepository;

    @GetMapping("/getUserById/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id){
        User u=userRepository.findById(id).orElse(null);
        if(u==null)
            return new ResponseEntity<>(u, HttpStatus.NOT_FOUND);
        return new ResponseEntity<>(u,HttpStatus.OK);
    }

    @GetMapping("/get1")
    public String get(){
        return "hello";
    }
    @PostMapping("/signin")
    public ResponseEntity<?> signin( @RequestBody User u){

        try{
            User user=userRepository.findByUserName(u.getUserName());
            if(user==null){
                return new ResponseEntity<>(null,HttpStatus.NOT_FOUND);
            }
            Authentication authentication=authenticationManager
                    .authenticate(new UsernamePasswordAuthenticationToken(u.getUserName(),u.getPassword()));

            SecurityContextHolder.getContext().setAuthentication(authentication);
            CustomUserDetails userDetails=(CustomUserDetails)authentication.getPrincipal();
            ResponseCookie jwtCookie=jwtUtils.generateJwtCookie(userDetails);

            return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE,jwtCookie.toString())
                    .body(user);
        } catch(UsernameNotFoundException e){
             return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        } catch (AuthenticationException ex) {
             return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    }


    @PostMapping("/signup")
    public ResponseEntity<?> signUp( @RequestBody User user){
        try{
            boolean search=userRepository.existsUserByUserName(user.getUserName());
            if (search) {
                return new ResponseEntity<>(null, HttpStatus.CONFLICT);
            }
            String passwordBeforeBcrypt=user.getPassword();
            user.setPassword(new BCryptPasswordEncoder(8).encode(user.getPassword()));

           user.getRoles().add(roleRepository.findById((long)1).get());
            User u=userRepository.save(user);
            Authentication authentication = authenticationManager
                    .authenticate(new UsernamePasswordAuthenticationToken(user.getUserName(), passwordBeforeBcrypt));

            SecurityContextHolder.getContext().setAuthentication(authentication);


            CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
            ResponseCookie jwtCookie = jwtUtils.generateJwtCookie(userDetails);

            return ResponseEntity.ok()
                    .header(HttpHeaders.SET_COOKIE,jwtCookie.toString())
                    .body(u);

//        return ResponseEntity.ok(user);
            //return new ResponseEntity<>(user,HttpStatus.CREATED);
        }catch (AuthenticationException ex) {
            return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
        }


    }

    @PostMapping("/signout")
    public ResponseEntity<?> signOut(){
        try{
            ResponseCookie cookie=jwtUtils.getCleanJwtCookie();
            return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE,cookie.toString())
                    .body("you've been signed out!");
        } catch (AuthenticationException ex) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("Failed to sign out: Unauthorized access.");
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("An error occurred while signing out.");
        }
    }
}

