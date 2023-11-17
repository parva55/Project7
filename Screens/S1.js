import React, { useState, useEffect, useLayoutEffect} from 'react';
import {Text, View, FlatList, TouchableOpacity, Image} from 'react-native';
import StarRating from 'react-native-star-rating';
import {getMovies, height, imageUrl, width } from '../Api/api';
// import { Icon } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';

export default S1 = ({navigation,route}) => {

    const [mData,setMData] = useState(null);

    const GetMoviesData = async () => {
        var res = await getMovies();
        // console.log('res',res);
        if(res.resData.results){
            const Movies = res.resData.results.map((m) => ({
                ...m,
                isFav: false,
            }));
            console.log('res data',Movies[2]);
            // console.log(`${imageUrl}${Movies[0].poster_path}`);
            setMData(Movies);
        }
    };

    const toggleFav = async (userId) => {
        const updatedFav = mData.map((user) => {
            if (user.id === userId) {
                user.isFav = !user.isFav;
            }
            return user;
        });
        setMData(updatedFav);
        // await AsyncStorage.setItem('@users', JSON.stringify(updatedUsers));
    };

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: true,
            title: 'Latest movies'
        })
    })

    useEffect(()=> {
        GetMoviesData();
    },[]);

    return (
        <View style={{flex:1,backgroundColor:'#696a6b'}}>
            <FlatList 
                data={mData}
                keyExtractor={item => item.id}
                numColumns={2}
                renderItem={({item,index})=> (
                    <TouchableOpacity onPress={()=>navigation.navigate('S2',{id:item.id})} 
                        style={[
                            {
                                justifyContent:'center',
                                alignItems:'center',
                                marginHorizontal:"2%",
                                width: width * 0.92/2,
                                height: height * 0.45,
                            },index === mData.length - 1 && mData.length % 2 === 1
                            ? { marginHorizontal: '24%',}
                            : {},
                        ]}>
                        <View style={{width:'100%',height:'75%',}}>
                            <Image resizeMode='contain' source={{ uri: `${imageUrl}${item.poster_path}`}} style={{width:'100%',height:'100%',borderTopRightRadius:20,borderBottomRightRadius:20}}/>
                            <TouchableOpacity style={{position: 'absolute', top: 10, right: 10 }} onPress={()=> toggleFav(item.id)}>
                                {item.isFav ? 
                                    <Icon name="heart" size={25} color="#fff" /> 
                                    :  
                                    <Icon name="heart-o" size={25} color="#fff" />
                                }
                            </TouchableOpacity>
                        </View>
                        <Text style={{color:'#fff',fontSize:16,justifyContent:'flex-start',alignSelf:'flex-start',textAlign:'left',marginTop:'2%'}}  ellipsizeMode='tail' numberOfLines={1}>{item.title}</Text>
                        

                        <View style={{flexDirection:'row',justifyContent: 'space-between',alignItems: 'center',width:'100%'}}>
                            <StarRating
                                disabled={true}
                                maxStars={10}
                                rating={parseInt(item.vote_average)}
                                starSize={width*0.03}
                                fullStarColor={'#e60e9e'}
                                emptyStar={'star'}
                                emptyStarColor={'#bebfc2'}
                                halfStarEnabled={true}
                                starStyle={{marginRight:2}}
                                // halfStarColor={'#bebfc2'}
                                // selectedStar={(rating) => setStarCount(rating)}
                            />
                            <Text style={{color:'#bebfc2',fontSize:14,}}>({parseFloat(item.vote_average.toFixed(1))})</Text>
                        </View>

                        <View style={{flexDirection:'row',justifyContent: 'space-between', alignItems: 'center',width: '100%'}}>
                            <Text style={{color:'#fff',fontSize:14,textAlign:'left'}}>{item.release_date}</Text>
                            <Text style={{color:'#bebfc2',fontSize:14,textAlign:'right'}}>Vote({item.vote_count})</Text>
                        </View>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
};